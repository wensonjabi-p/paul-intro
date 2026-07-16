/* 관리자 전용 — 인터뷰 원본 답변(질문+답)을 공개 피드용 1인칭 생각+태그로 다듬어 돌려준다.
   저장은 하지 않음 — 프론트에서 Paul이 문구를 확인/수정한 뒤 /api/thoughts로 발행한다.
   (신규 저장분은 interview-save.js가 이 로직을 자동으로 돌려 곧바로 발행한다 — 이 엔드포인트는
   그 이전에 쌓인 백로그를 수동으로 올리거나, 자동 발행된 문구를 다시 다듬을 때 쓴다.) */
const { isValidSession } = require('./_lib');
const { polishAnswer } = require('./_polish');

module.exports = async (req, res) => {
  if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: '로그인이 필요해요.' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { question, answer, node } = body || {};
  const result = await polishAnswer({ question, answer, node });
  if (!result) return res.status(400).json({ error: 'no answer' });
  res.status(200).json(result);
};
