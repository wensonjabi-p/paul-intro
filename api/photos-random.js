/* 공개 — 성좌에서 고른 단어(tags)와 겹치는 발행된 사진 중 하나를 랜덤으로. 없으면 null. */
const { kvListAll } = require('./_lib');

module.exports = async (req, res) => {
  const tagsParam = (req.query.tags || '').toString();
  const wanted = tagsParam.split(',').map(s => s.trim()).filter(Boolean);
  if (!wanted.length) return res.status(200).json({ photo: null });

  try {
    const all = await kvListAll('photos:meta');
    const matches = all.filter(p => p.published !== false && (p.tags || []).some(t => wanted.includes(t)));
    if (!matches.length) return res.status(200).json({ photo: null });
    const pick = matches[Math.floor(Math.random() * matches.length)];
    res.status(200).json({ photo: pick });
  } catch (e) {
    res.status(200).json({ photo: null }); // storage not ready yet — fail quiet on public site
  }
};
