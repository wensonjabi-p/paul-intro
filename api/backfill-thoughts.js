/* 관리자 전용 — 기존에 저장된 인터뷰 답변 전체를 개선된 _polish.js 프롬프트(맥락 자립 문장 + 더 구체적인
   태그)로 다시 다듬어 thoughts:captured에 반영한다. 이미 자동발행된 항목은 같은 자리에서 텍스트/태그만
   덮어쓰고(중복 생성 안 함), 이 기능 이전에 쌓여 한 번도 발행 안 된 옛 백로그는 새로 발행한다.
   한 번 호출에 일부만 처리하고 다음 처리할 위치를 돌려준다 — 관리자 화면이 done이 될 때까지 반복 호출한다
   (Anthropic 호출이 항목마다 걸려서 한 번에 다 처리하면 서버리스 함수 시간제한에 걸릴 수 있음). */
const { isValidSession, kvListAll, kvReplaceAll } = require('./_lib');
const { polishAnswer } = require('./_polish');

const CHUNK = 8;

module.exports = async (req, res) => {
  if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: '로그인이 필요해요.' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const offset = Math.max(0, Number(body && body.offset) || 0);

  const batches = await kvListAll('interview:answers');
  const thoughts = await kvListAll('thoughts:captured');
  const thoughtById = new Map(thoughts.map(t => [t.id, t]));

  // 전체 답변을 배치 순서대로 평탄화 — offset은 이 순서를 기준으로 한다.
  const flat = [];
  batches.forEach((b, bi) => (b.items || []).forEach((it, ii) => flat.push({ bi, ii, it, savedAt: b.savedAt })));

  const total = flat.length;
  const slice = flat.slice(offset, offset + CHUNK);
  let updated = 0, created = 0, failed = 0;

  for (const { bi, ii, it, savedAt } of slice) {
    try {
      const result = await polishAnswer({ question: it.question, answer: it.answer, node: it.node });
      if (!result) { failed++; continue; }
      const existingId = it.thoughtId;
      if (existingId && thoughtById.has(existingId)) {
        const t = thoughtById.get(existingId);
        t.text = result.polished.text;
        t.tags = result.polished.tags || [];
        t.tagLabels = result.polished.tagLabels || {};
        t.source = 'interview';
        updated++;
      } else {
        const thoughtId = 'th-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
        thoughtById.set(thoughtId, {
          id: thoughtId, text: result.polished.text, photoUrl: null,
          tags: result.polished.tags || [], tagLabels: result.polished.tagLabels || {},
          createdAt: savedAt || Date.now(), published: true, source: 'interview',
        });
        batches[bi].items[ii] = Object.assign({}, it, { autoPublished: true, thoughtId });
        created++;
      }
    } catch (e) { failed++; }
  }

  await kvReplaceAll('thoughts:captured', Array.from(thoughtById.values()));
  await kvReplaceAll('interview:answers', batches);

  const nextOffset = offset + slice.length;
  res.status(200).json({
    processedThisRun: slice.length, updated, created, failed,
    total, nextOffset, done: nextOffset >= total,
  });
};
