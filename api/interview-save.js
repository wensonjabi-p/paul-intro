/* 인터뷰 앱의 "저장하기"가 호출. 인증 없음(개인용 저장함, 스팸 위험 낮음) — KV에 이어붙인다.
   기본적으로 각 답변을 다듬어 공개 피드(thoughts:captured)에 자동 발행한다 — 관리자 화면을 거치지 않아도
   바로 사이트에 반영됨. 특정 답변을 비공개로 남기고 싶으면 admin.html "생각" 탭에서 그 항목을
   비공개로 돌리면 된다(원본은 그대로 남고 공개 GET에서만 숨겨짐). */
const { kvPushJSON } = require('./_lib');
const { polishAnswer } = require('./_polish');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { savedAt, items } = body || {};
  if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'no items' });

  // 답변마다 다듬어서 공개 피드에 자동 발행 — 실패해도 원본 답변 저장(interview:answers)은 계속 진행한다.
  const enrichedItems = await Promise.all(items.map(async (it) => {
    try {
      const result = await polishAnswer({ question: it.question, answer: it.answer, node: it.node });
      if (!result) return it;
      const thoughtId = 'th-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
      await kvPushJSON('thoughts:captured', {
        id: thoughtId, text: result.polished.text, photoUrl: null,
        tags: result.polished.tags || [], tagLabels: result.polished.tagLabels || {},
        createdAt: Date.now(), published: true, source: 'interview',
      });
      return Object.assign({}, it, { autoPublished: true, thoughtId });
    } catch (e) {
      return it;
    }
  }));

  try {
    await kvPushJSON('interview:answers', { savedAt: savedAt || Date.now(), items: enrichedItems });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(503).json({ error: 'storage not ready: ' + e.message });
  }
};
