/* 스토리 카드를 바탕으로 실제 AI 그림을 생성한다. 두 단계: (1) Claude가 이야기 + 이미 고른 카드 팔레트의
   무드 + 화풍 프리셋을 보고 짧은 영어 이미지 프롬프트로 압축, (2) Replicate(Flux Schnell)로 그 프롬프트를 그림으로 만든다.
   Replicate가 돌려주는 URL을 그대로 클라이언트에 넘기면 캔버스에 그려 다운로드/공유할 때 CORS로 막힐 수 있어,
   우리 Vercel Blob에 한 번 더 업로드해서 넘긴다(이미 사진 업로드에 쓰는 것과 같은 스토리지).
   ANTHROPIC_API_KEY나 REPLICATE_API_TOKEN이 없으면(둘 다 Paul이 직접 설정해야 함) 조용히
   {imageUrl:null} 반환 — 클라이언트가 "생성 실패" 처리로 자연스럽게 넘어간다.
   이 파일이 Vercel Hobby 플랜 서버리스 함수 12개 한도의 마지막 자리 — 앞으로는 새 파일 대신
   기존 파일에 action/mode로 얹을 것. */
const { put, del } = require('@vercel/blob');
const { stripModelArtifacts, kvPushJSON, kvListAll, kvReplaceAll, isValidSession } = require('./_lib');

// 화풍 프리셋 30종(2026-07-19, Paul 요청 — 기본 스타일을 고르기 전에 다양하게 실제로 만들어서 보여줄 것).
// directive는 영어 화풍 지시어로 이미지 프롬프트에 그대로 녹여 씀. label은 나중에 클라이언트 선택 UI에 쓸 한국어 이름.
const STYLE_PRESETS = [
  { id: 'pen-sketch', label: '펜 스케치', directive: 'loose pen-and-ink line sketch, sparse expressive linework, like a personal travel journal drawing, minimal cross-hatching, white paper background' },
  { id: 'ink-wash-fountain', label: '만년필 잉크 워시', directive: 'fountain pen ink wash sketch, scratchy expressive contour lines, sparse light watercolor tint bleeding from the linework' },
  { id: 'ballpoint-continuous', label: '볼펜 연속선 드로잉', directive: 'ballpoint pen doodle, continuous unbroken contour line drawing, minimal shading, casual notebook-margin feel' },
  { id: 'technical-pen', label: '테크니컬 펜 세밀화', directive: 'fine technical pen illustration, delicate cross-hatch shading, precise engraving-like linework' },
  { id: 'charcoal-brush', label: '목탄·붓 스케치', directive: 'charcoal and ink brush sketch, bold gestural strokes, worn textured paper' },
  { id: 'ink-watercolor', label: '잉크 + 수채화', directive: 'loose ink and watercolor illustration, gentle watercolor bleeding, delicate ink linework' },
  { id: 'sumi-e', label: '수묵화(동양화풍)', directive: 'traditional East Asian ink wash sumi-e painting, minimal brushstrokes, generous negative space' },
  { id: 'wet-watercolor', label: '웻온웻 수채 번짐', directive: 'wet-on-wet watercolor bleed, soft diffused edges, dreamy pastel color wash' },
  { id: 'abstract-geo', label: '추상 기하학', directive: 'abstract geometric shapes and flat color fields, no representational forms, bold minimal composition' },
  { id: 'abstract-expr', label: '추상표현주의', directive: 'abstract expressionist gestural brushwork, energetic color splashes, emotional non-representational forms' },
  { id: 'abstract-collage', label: '추상 콜라주', directive: 'abstract collage of torn paper textures and muted color fields, layered composition' },
  { id: 'abstract-minimal', label: '미니멀 추상 라인', directive: 'minimalist abstract line and shape composition, generous negative space, single bold accent color' },
  { id: 'ukiyo-e', label: '우키요에 목판화풍', directive: 'ukiyo-e woodblock print style, flat color planes, bold clean outlines, stylized waves and clouds' },
  { id: 'art-deco', label: '아르데코 포스터', directive: 'art deco poster illustration, geometric ornamentation, elegant metallic accent colors' },
  { id: 'bauhaus', label: '바우하우스 포스터', directive: 'bauhaus poster design, primary colors, geometric abstraction, bold minimal shapes' },
  { id: 'impressionist', label: '인상주의 화풍', directive: 'impressionist painting style, visible loose brushstrokes, soft natural light, atmospheric color' },
  { id: 'art-nouveau', label: '아르누보 일러스트', directive: 'art nouveau illustration, flowing organic linework, decorative floral border motifs' },
  { id: 'cubist', label: '큐비즘풍 조형', directive: 'cubist-inspired fragmented geometric forms, multiple perspectives, muted earthy palette' },
  { id: 'editorial-flat', label: '모던 에디토리얼 일러스트', directive: 'modern editorial illustration, flat vector shapes, muted contemporary color palette' },
  { id: 'risograph', label: '리소그래프 인쇄풍', directive: 'risograph print style, grainy halftone texture, limited duotone color palette' },
  { id: 'vaporwave', label: '베이퍼웨이브', directive: 'vaporwave aesthetic, gradient sky, retro-futuristic glow, pastel neon tones' },
  { id: 'y2k-collage', label: 'Y2K 디지털 콜라주', directive: 'Y2K digital collage, glossy gradients, playful chrome accents, early-internet nostalgia' },
  { id: 'film-grain', label: '아날로그 필름 감성', directive: 'grainy analog film photography aesthetic, warm light leaks, soft focus, nostalgic tone' },
  { id: 'cinematic-matte', label: '시네마틱 매트 페인팅', directive: 'cinematic matte painting, moody atmospheric lighting, wide dramatic composition' },
  { id: 'linocut', label: '리노컷 판화', directive: 'linocut print style, bold black outlines, high contrast, hand-carved texture' },
  { id: 'chalk-pastel', label: '파스텔 화풍', directive: 'chalk pastel on textured paper, soft blended colors, gentle grain' },
  { id: 'gouache', label: '구아슈 포스터풍', directive: 'gouache illustration, flat opaque matte colors, clean poster-like clarity' },
  { id: 'stained-glass', label: '스테인드글라스', directive: 'stained glass style, bold black leading lines, jewel-toned translucent color panels' },
  { id: 'paper-cutout', label: '종이 오림 콜라주', directive: 'paper cutout collage style, layered flat shapes, subtle soft drop shadows' },
  { id: 'monoprint', label: '모노프린트 질감', directive: 'monoprint textured illustration, organic ink blooms, tactile paper grain' },
  // 2026-07-19 추가분 — Paul 요청: "선으로만 그려진 그림", 손으로 그린 느낌, 단색/심플한 색상 위주로 더.
  { id: 'mono-line-art', label: '모노라인 아트', directive: 'clean continuous single-line illustration, one unbroken fluid contour line, monochrome black ink on plain white background, no shading, no cross-hatching, elegant minimalism' },
  { id: 'blind-contour', label: '블라인드 컨투어 드로잉', directive: 'loose blind-contour drawing, a single imperfect wobbly hand-drawn line, raw intimate sketchbook quality, black ink on white, uncorrected and spontaneous' },
  { id: 'fashion-line', label: '패션 일러스트 라인', directive: 'fashion illustration continuous line art, elegant flowing gestural contour lines, mostly white negative space with one soft flat accent color used sparingly' },
  { id: 'single-accent-line', label: '단색 포인트 라인', directive: 'flat minimal line illustration, thin uniform black contour lines throughout, one small area filled with a single solid accent color, generous white space' },
  { id: 'marker-doodle', label: '마커 손그림', directive: 'bold felt-tip marker line doodle, thick confident continuous hand-drawn strokes, monochrome or a single flat accent color, playful loose energy' },
  // 2026-07-19 추가분 2차 — Paul이 참고 이미지(어반스케치 계열: 펜 크로스해칭 도심 스케치, 채색 없는 순수 라인
  // 드로잉, 펜+옅은 수채 워시 여행 스케치)를 보여주며 "채우기 없이 선만으로 그린 그림"을 더 요청.
  { id: 'urban-ink-density', label: '도심 밀도 펜화', directive: 'dense detailed pen-and-ink illustration, intricate cross-hatching filling the entire composition, bold black linework, monochrome, no color, gritty urban sketch density' },
  { id: 'fineliner-nocolor', label: '순수 라인(무채색)', directive: 'precise fineliner pen contour line art, multiple clean black lines with architectural precision, absolutely no shading, no fill, no color — pure line on white paper' },
  { id: 'urban-sketch-wash', label: '어반스케치 펜+수채', directive: 'urban sketch style, precise pen ink linework, controlled light watercolor wash in muted natural tones, generous white paper left unpainted, travel-journal illustration quality' },
  // 2026-07-19 추가분 3차 — Paul이 urban-ink-density/urban-sketch-wash/marker-doodle을 마음에 들어 함,
  // "좀 더 손으로 그린 단순한 선 위주의 그림들" 추가 요청 — 정교함보다 단순함·손맛에 무게를 둔 라인 계열.
  { id: 'crayon-line', label: '크레용 라인', directive: 'thick soft wax crayon line drawing, simple childlike shapes, minimal detail, single or two flat colors, warm tactile hand-drawn texture' },
  { id: 'pencil-simple', label: '연필 라인 스케치', directive: 'soft graphite pencil sketch, sparse simple lines, minimal light smudged shading only where needed, quiet understated hand-drawn quality' },
  { id: 'brush-pen-line', label: '붓펜 손그림', directive: 'tapered brush-pen line drawing, strokes varying naturally in width, simple confident linework, monochrome, organic hand-drawn energy' },
  { id: 'naive-doodle', label: '내추럴 손그림', directive: 'naive folk-art style simple line drawing, childlike loose proportions, thick uneven hand-drawn strokes, single flat color, charmingly imperfect' },
];
const DEFAULT_STYLE_ID = 'ink-watercolor'; // Paul이 30종 검토 후 최종 선택하면 이 값을 바꿀 것

// 주인공 표현 방식 프리셋(2026-07-20, Paul 피드백: "주인공이 주로 검은색이 채워진 남자로 나오는데
// 다양하게 선택할 수 있었으면 좋겠어") — PROMPT_SYSTEM의 일반적인 다양화 지시만으로는 여전히 검은
// 실루엣으로 자주 그려져서, 사용자가 명시적으로 표현 방식을 고를 수 있게 함. 'auto'는 directive가
// 비어있어 PROMPT_SYSTEM의 기본 지시를 그대로 따른다(= 화풍에 맞게 자동).
const PROTAGONIST_PRESETS = [
  { id: 'auto', directive: '' },
  { id: 'pen-line', directive: "depict any human figure as a light, unfilled pen-line sketch outline only, never filled with solid color" },
  { id: 'watercolor-figure', directive: 'depict any human figure as a soft translucent watercolor wash with blurred diffuse edges, not a solid silhouette' },
  { id: 'thread-line', directive: 'depict any human figure as if traced from a single continuous thread or embroidery line' },
  { id: 'color-block', directive: "depict any human figure as a flat shape filled with the illustration's accent color, never solid black" },
  { id: 'semi-transparent', directive: 'depict any human figure as a semi-transparent, see-through silhouette rather than a solid filled shape' },
  { id: 'light-outline', directive: 'suggest any human figure only through light, glow, or a faint outline rather than a solid rendered form' },
  { id: 'gradient-figure', directive: 'depict any human figure filled with a soft color gradient rather than one flat solid color' },
  { id: 'from-behind', directive: 'if a human figure appears, show them from behind or as a soft cast shadow, never a front-facing silhouette' },
  { id: 'partial-figure', directive: 'show only a fragment of a human figure — a hand, feet, or the back of a neck — rather than a full body' },
  { id: 'no-figure', directive: 'do not depict any human figure at all — represent the person through objects and space instead, like an empty chair, a desk, or a window' },
  { id: 'abstract-shape', directive: 'depict any human figure as a fully abstract shape that only hints at a person, never a literal or recognizable form' },
  { id: 'fading', directive: 'depict any human figure as if half-erased or fading away, with soft incomplete edges' },
  { id: 'simplified-cartoon', directive: 'depict any human figure in a simplified, doodle-like style rather than a realistic silhouette' },
  { id: 'gender-neutral', directive: 'depict any human figure in a gender-neutral way, without clearly masculine or feminine markers' },
];

// 이미 만든 이미지를 손보는 메뉴(2026-07-20, Paul 요청) — 완전히 같은 픽셀을 고치는 게 아니라, 같은
// story/mood/화풍/주인공 표현을 유지한 채 이 지시를 더해서 다시 그리는 방식(재생성). id는
// index.html의 IMAGE_EDIT_OPTIONS와 정확히 일치해야 한다.
const IMAGE_EDIT_GUIDE = {
  darker: 'make the mood darker and moodier, with low-key lighting',
  brighter: 'make it brighter and more radiant',
  dreamy: 'make it more dreamlike, soft and hazy',
  contrast: 'increase the contrast and make it bolder',
  'warm-color': 'shift the color palette warmer',
  'cool-color': 'shift the color palette cooler',
  monochrome: 'render it in black and white, monochrome',
  saturation: 'increase the color saturation, more vivid',
  closeup: 'compose it as a closer, more intimate close-up',
  'wide-shot': 'compose it as a wider shot with more background and landscape visible',
  symmetric: 'use a more symmetric, centered composition',
  rougher: 'make the linework rougher and more expressive',
  finer: 'make the linework finer and more delicate',
  'paper-texture': 'emphasize visible paper or canvas texture',
  simpler: 'simplify the background so the subject stands out more',
  pose: "change the protagonist's pose or gesture",
  clearer: 'make the protagonist appear more clearly and distinctly',
  silhouette: 'make the protagonist more silhouette-like and abstract',
  night: 'set the scene at night',
  sunset: 'set the scene at golden-hour sunset or dusk',
  season: 'shift the season, for example to winter',
};

const PROMPT_SYSTEM = `당신은 이미지 생성 AI에게 넘길 프롬프트를 쓰는 아트 디렉터입니다.
Paul Bhang이라는 사람의 인생 이야기 한 조각과, 이미 골라둔 카드 스타일의 색·분위기, 그리고 지정된 화풍을 보고,
그 장면을 표현할 영어 이미지 생성 프롬프트를 씁니다.

- 반드시 영어로, 1~2문장.
- 글자·텍스트·간판·책 표지처럼 읽을 수 있는 문자가 그림에 등장하면 안 됩니다(no text, no letters, no words, no signage).
- 이야기에 사람(주인공)이 꼭 등장할 필요는 없습니다 — 장면·사물·풍경만으로 충분히 표현되면 사람 없이 그리세요.
  사람이 나오는 게 자연스러운 이야기일 때만 등장시키세요.
- 주인공을 그릴 때는 사실적인 얼굴 초상은 금지하되(신원을 알아볼 수 있는 사실적 얼굴 X), 표현 방식은 매번
  다양하게 시도하세요 — 뒷모습 실루엣, 손이나 몸 일부의 클로즈업, 화풍에 맞는 단순한 펜선·붓선 인물
  스케치, 색과 형태로만 암시하는 추상적 존재, 빛과 그림자 등. 항상 같은 방식(예: 매번 검은 실루엣)만
  반복하지 말고, 지정된 화풍과 장면 분위기에 가장 잘 맞는 표현 방식을 골라 다양하게 쓰세요.
- 인물을 성별로 못박지 마세요 — Paul은 남자이지만, 이야기 분위기에 따라 중성적이거나 성별이 뚜렷하지 않은
  인물 표현도 괜찮습니다(실루엣·추상적 형태 등은 굳이 성별을 특정할 필요 없음).
- 주어진 화풍 지시어를 프롬프트에 그대로(또는 아주 가깝게) 포함하세요 — 화풍은 고정되어 있으니 임의로 바꾸지 마세요.
- 주어진 스타일 무드(배경색·포인트색 포함)에 어울리는 색감 지시어를 프롬프트에 넣으세요.`;

const PROMPT_TOOL = {
  name: 'submit_image_prompt',
  description: '이미지 생성 프롬프트를 제출한다.',
  input_schema: {
    type: 'object',
    properties: { prompt: { type: 'string', description: '영어 이미지 생성 프롬프트, 1~2문장' } },
    required: ['prompt'],
  },
};

// 실패 지점을 알 수 있게 각 단계에서 { ok, ...} 또는 { ok:false, status, body } 형태로 돌려준다 —
// 클라이언트엔 imageUrl:null만 보이면 되지만, 문제 진단할 때 Vercel 로그 없이도 바로 원인을 알 수 있게.
async function writeImagePrompt(key, storyText, moodText, styleDirective, protagonistDirective, editDirective) {
  const userMsg = `이야기: ${storyText}\n\n카드 스타일 무드: ${moodText || '(지정 없음)'}\n\n화풍 지시어(반드시 그대로 프롬프트에 녹여 쓸 것): ${styleDirective}` +
    (protagonistDirective ? `\n\n주인공 표현 방식(사람이 등장하는 경우 반드시 이 방식을 따를 것): ${protagonistDirective}` : '') +
    (editDirective ? `\n\n추가 수정 지시(반드시 반영할 것): ${editDirective}` : '') +
    `\n\n위 이야기와 무드, 화풍에 어울리는 이미지 생성 프롬프트를 써주세요.`;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 300,
      system: PROMPT_SYSTEM,
      messages: [{ role: 'user', content: userMsg.slice(0, 2000) }],
      tools: [PROMPT_TOOL],
      tool_choice: { type: 'tool', name: 'submit_image_prompt' },
    }),
  });
  if (!r.ok) return { ok: false, stage: 'claude', status: r.status, body: (await r.text().catch(() => '')).slice(0, 400) };
  const data = await r.json();
  const block = (data.content || []).find(c => c.type === 'tool_use' && c.name === 'submit_image_prompt');
  const prompt = block && block.input && block.input.prompt;
  if (!prompt) return { ok: false, stage: 'claude-no-prompt', body: JSON.stringify(data).slice(0, 400) };
  return { ok: true, prompt: stripModelArtifacts(prompt) };
}

// Prefer:wait만 믿으면 계정의 첫 호출처럼 모델 콜드스타트가 대기시간을 넘길 때 "starting" 상태로
// 그냥 돌아온다(실제 확인됨) — 그래서 즉시 응답이 안 끝나 있으면 짧은 간격으로 직접 폴링한다.
async function runReplicate(token, prompt) {
  const createRes = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', Prefer: 'wait=25' },
    body: JSON.stringify({ input: { prompt, aspect_ratio: '1:1', output_format: 'png', num_outputs: 1 } }),
  });
  if (!createRes.ok) return { ok: false, stage: 'replicate-create', status: createRes.status, body: (await createRes.text().catch(() => '')).slice(0, 400) };
  let data = await createRes.json();
  const pollUrl = data.urls && data.urls.get;

  const startedAt = Date.now();
  const budgetMs = 45000; // Vercel 함수 제한(60초) 안에서 Claude 호출·Blob 업로드 시간을 남겨두고 폴링
  while (data.status !== 'succeeded' && data.status !== 'failed' && data.status !== 'canceled') {
    if (!pollUrl || Date.now() - startedAt > budgetMs) return { ok: false, stage: 'replicate-timeout', status: data.status };
    await new Promise(resolve => setTimeout(resolve, 1200));
    const pollRes = await fetch(pollUrl, { headers: { Authorization: 'Bearer ' + token } });
    if (!pollRes.ok) return { ok: false, stage: 'replicate-poll', status: pollRes.status };
    data = await pollRes.json();
  }
  if (data.status !== 'succeeded') return { ok: false, stage: 'replicate-status', status: data.status, body: JSON.stringify(data.error || data).slice(0, 400) };
  const out = Array.isArray(data.output) ? data.output[0] : data.output;
  if (!out) return { ok: false, stage: 'replicate-no-output', body: JSON.stringify(data).slice(0, 400) };
  return { ok: true, url: out };
}

// 카드 보관함(saved-cards:meta) — Paul 요청: "생성했던 카드(글, 그림) 선택해서 서버에 보관... 관리자
// 페이지에서 볼 수 있게". 저장은 방명록·생각 기록과 같은 패턴으로 누구나(로그인 없이) 할 수 있고,
// 목록 조회·삭제는 admin.html 전용이라 관리자 세션이 필요하다.
async function saveCard(body) {
  const { dataUrl, kind, lang, ids, label } = body || {};
  if (!dataUrl || !/^data:image\/png;base64,/.test(dataUrl)) return { ok: false, status: 400, error: 'no image' };
  const buf = Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64');
  const filename = 'saved-cards/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.png';
  const blob = await put(filename, buf, { access: 'public', contentType: 'image/png', storeId: process.env.BLOB_PUBLIC_STORE_ID });
  const record = {
    id: 'card-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
    url: blob.url,
    kind: kind === 'ai-image' ? 'ai-image' : 'doodle',
    lang: ['ko', 'en', 'zh'].includes(lang) ? lang : 'ko',
    ids: Array.isArray(ids) ? ids.slice(0, 10).map(String) : [],
    label: String(label || '').slice(0, 120),
    createdAt: Date.now(),
  };
  await kvPushJSON('saved-cards:meta', record);
  return { ok: true, card: record };
}

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    // ?saved=1 — 관리자 카드 보관함 목록(로그인 필요). 그 외엔 화풍 목록(공개, 스타일 선택 UI용).
    if (req.query && req.query.saved === '1') {
      if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: 'login required' });
      try {
        const all = await kvListAll('saved-cards:meta');
        return res.status(200).json({ cards: all.sort((a, b) => b.createdAt - a.createdAt) });
      } catch (e) {
        return res.status(503).json({ error: 'storage not ready: ' + e.message });
      }
    }
    return res.status(200).json({ styles: STYLE_PRESETS.map(s => ({ id: s.id, label: s.label })), defaultStyleId: DEFAULT_STYLE_ID });
  }

  if (req.method === 'DELETE') {
    if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: 'login required' });
    let delBody = req.body;
    if (typeof delBody === 'string') { try { delBody = JSON.parse(delBody); } catch (e) { delBody = {}; } }
    const { id } = delBody || {};
    try {
      const all = await kvListAll('saved-cards:meta');
      const target = all.find(c => c.id === id);
      await kvReplaceAll('saved-cards:meta', all.filter(c => c.id !== id));
      if (target && target.url) { try { await del(target.url); } catch (e) {} }
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(503).json({ error: 'storage not ready: ' + e.message });
    }
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }

  if (body && body.action === 'save-card') {
    try {
      const result = await saveCard(body);
      return res.status(result.ok ? 200 : (result.status || 500)).json(result.ok ? { ok: true, card: result.card } : { error: result.error });
    } catch (e) {
      return res.status(503).json({ error: 'storage not ready: ' + e.message });
    }
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const replicateToken = process.env.REPLICATE_API_TOKEN;
  if (!anthropicKey || !replicateToken) return res.status(200).json({ imageUrl: null, reason: 'not-configured' });

  const { story, mood, debug, styleId, protagonistId, editId } = body || {};
  if (!story || !String(story).trim()) return res.status(200).json({ imageUrl: null });

  const preset = STYLE_PRESETS.find(s => s.id === styleId) || STYLE_PRESETS.find(s => s.id === DEFAULT_STYLE_ID);
  const protagonistPreset = PROTAGONIST_PRESETS.find(p => p.id === protagonistId) || PROTAGONIST_PRESETS[0]; // 없으면 'auto'
  const editDirective = IMAGE_EDIT_GUIDE[editId] || '';

  try {
    const promptResult = await writeImagePrompt(
      anthropicKey, String(story).slice(0, 1500), String(mood || '').slice(0, 200),
      preset.directive, protagonistPreset.directive, editDirective
    );
    if (!promptResult.ok) return res.status(200).json({ imageUrl: null, debug: debug ? promptResult : undefined });

    const replicateResult = await runReplicate(replicateToken, promptResult.prompt);
    if (!replicateResult.ok) return res.status(200).json({ imageUrl: null, debug: debug ? replicateResult : undefined, prompt: promptResult.prompt });

    const imgRes = await fetch(replicateResult.url);
    if (!imgRes.ok) return res.status(200).json({ imageUrl: null, debug: debug ? { stage: 'fetch-image', status: imgRes.status } : undefined });
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const filename = 'cards/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.png';
    // paul-intro-blob(기존 스토어)는 Private로 고정돼 공개 URL을 못 씀 — 새로 만든 Public 스토어를
    // storeId로 명시해서 그쪽에 올린다. (env: BLOB_PUBLIC_STORE_ID, Vercel Storage 탭에서 연결)
    const blob = await put(filename, buf, { access: 'public', contentType: 'image/png', storeId: process.env.BLOB_PUBLIC_STORE_ID });

    res.status(200).json({ imageUrl: blob.url, prompt: promptResult.prompt, styleId: preset.id, protagonistId: protagonistPreset.id });
  } catch (e) {
    res.status(200).json({ imageUrl: null, debug: debug ? { stage: 'exception', message: e.message } : undefined });
  }
};
