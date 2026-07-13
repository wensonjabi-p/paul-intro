/* 관리자 전용 — 폰 앱에서 "저장하기"로 서버에 쌓인 인터뷰 답변 조회. */
const { isValidSession, kvListAll } = require('./_lib');

module.exports = async (req, res) => {
  if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: '로그인이 필요해요.' });
  try {
    const all = await kvListAll('interview:answers');
    res.status(200).json({ batches: all.sort((a, b) => b.savedAt - a.savedAt) });
  } catch (e) {
    res.status(200).json({ batches: [], warning: 'storage not ready' });
  }
};
