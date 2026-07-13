/* 인터뷰 앱의 "저장하기"가 호출. 인증 없음(개인용 저장함, 스팸 위험 낮음) — KV에 이어붙임. */
const { kvPushJSON } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { savedAt, items } = body || {};
  if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'no items' });
  try {
    await kvPushJSON('interview:answers', { savedAt: savedAt || Date.now(), items });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(503).json({ error: 'storage not ready: ' + e.message });
  }
};
