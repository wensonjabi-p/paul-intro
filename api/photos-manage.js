/* 관리자 전용 — 사진 목록 조회 / 발행토글·태그수정 / 삭제. */
const { isValidSession, kvListAll, kvReplaceAll } = require('./_lib');

module.exports = async (req, res) => {
  if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: '로그인이 필요해요.' });

  try {
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
  } catch (e) {
    // KV 일시 장애 등으로 여기서 죽으면 응답이 JSON이 아니게 되어, 클라이언트가 이걸 "오프라인"으로
    // 잘못 표시하게 된다 — 반드시 유효한 JSON 에러로 돌려준다.
    res.status(503).json({ error: 'storage not ready: ' + e.message });
  }
};
