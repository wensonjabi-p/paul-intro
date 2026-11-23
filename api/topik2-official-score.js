/* TOPIK II — optional official exam score opt-in (calibration). Spec N10. */
const { kvPushJSON } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }
  const { uid, level, writingScore, examDate } = body || {};
  if (!uid) return res.status(400).json({ error: 'no uid' });

  try {
    await kvPushJSON('topik2:official-scores', {
      uid,
      level: level || null,
      writingScore: typeof writingScore === 'number' ? writingScore : null,
      examDate: examDate || null,
      submittedAt: Date.now(),
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(200).json({ ok: false });
  }
};
