/* 관리자 전용 — 빠른 기록(생각+사진 선택) 만들기/목록/발행토글/삭제. */
const { put } = require('@vercel/blob');
const { isValidSession, kvListAll, kvReplaceAll, kvPushJSON } = require('./_lib');

module.exports = async (req, res) => {
  if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: '로그인이 필요해요.' });

  if (req.method === 'GET') {
    const all = await kvListAll('thoughts:captured');
    return res.status(200).json({ thoughts: all.sort((a, b) => b.createdAt - a.createdAt) });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }

  if (req.method === 'POST') {
    const { text, dataUrl, tags } = body || {};
    if (!text || !text.trim()) return res.status(400).json({ error: '내용이 비어있어요.' });
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
      text: text.trim(), photoUrl, tags: Array.isArray(tags) ? tags : [],
      createdAt: Date.now(), published: true,
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
};
