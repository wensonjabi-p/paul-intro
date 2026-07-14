/* 공개 페이지의 연락 폼 — 항상 KV에 저장하고, RESEND_API_KEY가 있으면 Paul 이메일로도 즉시 전달.
   Resend 키가 없거나 발송이 실패해도 방문자에게는 저장 성공(ok:true)으로 응답한다 — 메시지 자체는 KV에 안전하게 남아있고,
   Paul이 나중에 RESEND_API_KEY를 설정하면 다음 메시지부터 자동으로 이메일이 간다. */
const { kvPushJSON } = require('./_lib');

const TO_EMAIL = 'wensonjabi@gmail.com';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { name, contact, message } = body || {};
  if (!message || !String(message).trim()) return res.status(400).json({ error: 'empty message' });

  const record = {
    id: 'ct-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    name: String(name || '').trim().slice(0, 200),
    contact: String(contact || '').trim().slice(0, 200),
    message: String(message).trim().slice(0, 5000),
    createdAt: Date.now(),
  };

  try { await kvPushJSON('contacts:messages', record); } catch (e) { console.error('contact-send: kv save failed', e.message); }

  const key = process.env.RESEND_API_KEY;
  let emailed = false;
  if (key) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Paul Intro <onboarding@resend.dev>',
          to: [TO_EMAIL],
          subject: '[Paul Intro 방문자 메시지]' + (record.name ? ' — ' + record.name : ''),
          text: `이름: ${record.name || '(안 남김)'}\n연락처: ${record.contact || '(안 남김)'}\n\n${record.message}`,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error('contact-send: resend not ok', r.status, await r.text().catch(() => ''));
    } catch (e) {
      console.error('contact-send: resend exception', e.message);
    }
  }

  res.status(200).json({ ok: true, emailed });
};
