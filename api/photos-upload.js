/* 관리자 전용 — 사진 업로드(base64 dataURL) + 캡션/태그를 Blob+KV에 저장. */
const { put } = require('@vercel/blob');
const { isValidSession, kvPushJSON } = require('./_lib');

module.exports = async (req, res) => {
  if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: '로그인이 필요해요.' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { dataUrl, caption, tags } = body || {};
  if (!dataUrl || !/^data:image\//.test(dataUrl)) return res.status(400).json({ error: '이미지가 없어요.' });

  const m = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!m) return res.status(400).json({ error: '이미지 형식을 읽을 수 없어요.' });
  const mime = m[1];
  const buf = Buffer.from(m[2], 'base64');
  const ext = mime.split('/')[1].replace('jpeg', 'jpg');
  const filename = 'photos/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext;

  try {
    const blob = await put(filename, buf, { access: 'public', contentType: mime });
    const record = {
      id: filename,
      url: blob.url,
      caption: (caption || '').trim(),
      tags: Array.isArray(tags) ? tags : [],
      createdAt: Date.now(),
      published: true,
    };
    await kvPushJSON('photos:meta', record);
    res.status(200).json({ ok: true, photo: record });
  } catch (e) {
    res.status(503).json({ error: '업로드 실패: ' + e.message });
  }
};
