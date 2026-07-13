/* 관리자 전용 — 사진 목록 조회 / 발행토글·태그수정 / 삭제. */
const { isValidSession, kvListAll, kvReplaceAll } = require('./_lib');

module.exports = async (req, res) => {
  if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: '로그인이 필요해요.' });

  if (req.method === 'GET') {
    const all = await kvListAll('photos:meta');
    return res.status(200).json({ photos: all.sort((a, b) => b.createdAt - a.createdAt) });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }

  if (req.method === 'PATCH') {
    const { id, published, caption, tags } = body || {};
    const all = await kvListAll('photos:meta');
    const idx = all.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'not found' });
    if (typeof published === 'boolean') all[idx].published = published;
    if (typeof caption === 'string') all[idx].caption = caption;
    if (Array.isArray(tags)) all[idx].tags = tags;
    await kvReplaceAll('photos:meta', all);
    return res.status(200).json({ ok: true, photo: all[idx] });
  }

  if (req.method === 'DELETE') {
    const { id } = body || {};
    const all = await kvListAll('photos:meta');
    const kept = all.filter(p => p.id !== id);
    await kvReplaceAll('photos:meta', kept);
    return res.status(200).json({ ok: true });
  }

  res.status(405).json({ error: 'method' });
};
