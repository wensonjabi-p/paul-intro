const { makeSessionCookie } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { password } = body || {};
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return res.status(500).json({ error: '서버에 ADMIN_PASSWORD가 설정되지 않았어요.' });
  if (!password || password !== expected) return res.status(401).json({ error: '비밀번호가 틀렸어요.' });
  res.setHeader('Set-Cookie', makeSessionCookie());
  res.status(200).json({ ok: true });
};
