/* 관리자 전용 — 폰 앱에서 저장된 인터뷰 답변 배치 조회(GET)·삭제(DELETE, savedAt으로 식별). */
const { isValidSession, kvListAll, kvReplaceAll } = require('./_lib');

module.exports = async (req, res) => {
  if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: '로그인이 필요해요.' });

  if (req.method === 'GET') {
    try {
      const all = await kvListAll('interview:answers');
      return res.status(200).json({ batches: all.sort((a, b) => b.savedAt - a.savedAt) });
    } catch (e) {
      return res.status(200).json({ batches: [], warning: 'storage not ready' });
    }
  }

  if (req.method === 'DELETE') {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    const { savedAt } = body || {};
    if (!savedAt) return res.status(400).json({ error: 'savedAt 필요' });
    const all = await kvListAll('interview:answers');
    await kvReplaceAll('interview:answers', all.filter(b => b.savedAt !== savedAt));
    return res.status(200).json({ ok: true });
  }

  res.status(405).json({ error: 'method' });
};
