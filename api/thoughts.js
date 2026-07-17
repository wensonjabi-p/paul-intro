/* 빠른 기록(생각+사진 선택). 만들기(POST)는 인터뷰 앱에서 로그인 없이 쓸 수 있게 열어둠(개인용, 스팸 위험 낮음).
   조회·수정·삭제(GET/PATCH/DELETE)는 관리자 전용. */
const { put } = require('@vercel/blob');
const { isValidSession, kvListAll, kvReplaceAll, kvPushJSON } = require('./_lib');

module.exports = async (req, res) => {
  const admin = isValidSession(req.headers.cookie);

  // GET은 공개 — 단, 비로그인 방문자에게는 발행(published)된 항목만 보여준다.
  // POST(빠른 기록)도 로그인 없이 열려 있음. 그 외(PATCH/DELETE)는 관리자 전용.
  if (req.method !== 'GET' && req.method !== 'POST' && !admin) {
    return res.status(401).json({ error: '로그인이 필요해요.' });
  }

  try {
  if (req.method === 'GET') {
    const all = await kvListAll('thoughts:captured');
    const visible = admin ? all : all.filter(t => t.published !== false);
    return res.status(200).json({ thoughts: visible.sort((a, b) => b.createdAt - a.createdAt) });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }

  if (req.method === 'POST') {
    const { text, dataUrl, tags, tagLabels, source } = body || {};
    // text는 빠른 기록처럼 단일 문자열이거나, 다듬어진 3개 언어 {ko,en,zh}일 수 있다.
    const isTrilingual = text && typeof text === 'object';
    const emptyText = isTrilingual ? !(text.ko || text.en || text.zh) : !text || !String(text).trim();
    if (emptyText) return res.status(400).json({ error: '내용이 비어있어요.' });
    const normalizedText = isTrilingual
      ? { ko: text.ko || text.en || text.zh || '', en: text.en || text.ko || '', zh: text.zh || text.ko || '' }
      : String(text).trim();
    let photoUrl = null;
    if (dataUrl && /^data:image\//.test(dataUrl)) {
      const m = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
      if (m) {
        const mime = m[1], buf = Buffer.from(m[2], 'base64');
        const ext = mime.split('/')[1].replace('jpeg', 'jpg');
        const filename = 'thoughts/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext;
        const blob = await put(filename, buf, { access: 'public', contentType: mime });
        photoUrl = blob.url;
      }
    }
    const record = {
      id: 'th-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      text: normalizedText, photoUrl, tags: Array.isArray(tags) ? tags : [],
      tagLabels: (tagLabels && typeof tagLabels === 'object') ? tagLabels : {},
      createdAt: Date.now(), published: true,
      // 'interview' — AI가 다듬고 라벨까지 붙인 인터뷰 답변만. 빠른 기록(자유 태그)은 표시 안 함 —
      // 성좌에 자동으로 새 클릭 가능한 단어로 편입되는 건 이 표시가 있는 것만(공개페이지에서 판단).
      source: source === 'interview' ? 'interview' : undefined,
    };
    await kvPushJSON('thoughts:captured', record);
    return res.status(200).json({ ok: true, thought: record });
  }

  if (req.method === 'PATCH') {
    const { id, published, text, tags } = body || {};
    const all = await kvListAll('thoughts:captured');
    const idx = all.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ error: 'not found' });
    if (typeof published === 'boolean') all[idx].published = published;
    if (typeof text === 'string') all[idx].text = text;
    else if (text && typeof text === 'object') {
      all[idx].text = { ko: text.ko || text.en || text.zh || '', en: text.en || text.ko || '', zh: text.zh || text.ko || '' };
    }
    if (Array.isArray(tags)) all[idx].tags = tags;
    await kvReplaceAll('thoughts:captured', all);
    return res.status(200).json({ ok: true, thought: all[idx] });
  }

  if (req.method === 'DELETE') {
    const { id } = body || {};
    const all = await kvListAll('thoughts:captured');
    await kvReplaceAll('thoughts:captured', all.filter(t => t.id !== id));
    return res.status(200).json({ ok: true });
  }

  res.status(405).json({ error: 'method' });
  } catch (e) {
    // KV 일시 장애 등으로 여기서 죽으면 응답이 JSON이 아니게 되어, 클라이언트가 이걸 "오프라인"으로
    // 잘못 표시하게 된다 — 반드시 유효한 JSON 에러로 돌려준다.
    res.status(503).json({ error: 'storage not ready: ' + e.message });
  }
};
