/* 방명록 — 방문 집계 + 댓글/답글(로그인 없이 즉시 공개, 짧은 도배 방지) + 버튼으로 그때그때 AI 번역(결과 캐시).
   Vercel Hobby 플랜 서버리스 함수 12개 제한 때문에 방문수/목록/작성/번역을 전부 이 파일 하나에 묶는다
   (thoughts.js의 backfill action과 같은 패턴). 삭제(모더레이션)만 관리자 전용.
   승인 절차 없이 바로 올라가는 대신, 같은 방문자가 짧은 시간 안에 연달아 쓰는 건 막고,
   문제 있는 글은 admin.html에서 지울 수 있게 한다. */
const crypto = require('crypto');
const { kv, kvPushJSON, kvListAll, kvReplaceAll, isValidSession, stripModelArtifacts } = require('./_lib');

const MAX_TEXT_LEN = 500;
const MAX_NAME_LEN = 40;
const COOLDOWN_MS = 20000; // 같은 방문자가 20초 안에 다시 쓰면 막음
const RECENT_SCAN = 40; // 도배 판정 시 훑어볼 최근 댓글 수
const LANG_NAME = { ko: '한국어', en: '영어', zh: '중국어' };

function clientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  if (xf) return xf.split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}
function hashIp(ip) {
  return crypto.createHash('sha256').update(ip + '|' + (process.env.ADMIN_SECRET || 'gb-salt')).digest('hex').slice(0, 20);
}
function publicShape(c) {
  const { ipHash, ...pub } = c;
  return pub;
}
function collectDescendantIds(all, rootId) {
  const ids = new Set([rootId]);
  let grew = true;
  while (grew) {
    grew = false;
    all.forEach(c => {
      if (c.parentId && ids.has(c.parentId) && !ids.has(c.id)) { ids.add(c.id); grew = true; }
    });
  }
  return ids;
}

async function translateOnce(key, text, lang) {
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 300,
        system: `주어진 방명록 댓글 원문을 자연스러운 ${LANG_NAME[lang] || lang}로 번역만 하세요. 설명이나 따옴표 없이 번역된 문장만 출력하세요.`,
        messages: [{ role: 'user', content: String(text).slice(0, 1000) }],
      }),
    });
    if (!r.ok) return null;
    const data = await r.json();
    const block = (data.content || []).find(c => c.type === 'text');
    return block ? stripModelArtifacts(block.text).slice(0, 800) : null;
  } catch (e) { return null; }
}

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const [all, visits] = await Promise.all([
        kvListAll('guestbook:comments'),
        kv('INCR', 'guestbook:visits'),
      ]);
      const comments = all.map(publicShape).sort((a, b) => a.createdAt - b.createdAt);
      return res.status(200).json({ comments, visits: Number(visits) || 0 });
    }

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }

    if (req.method === 'POST' && body && body.action === 'translate') {
      const { id, lang } = body;
      if (!LANG_NAME[lang]) return res.status(400).json({ error: 'unsupported lang' });
      const all = await kvListAll('guestbook:comments');
      const idx = all.findIndex(c => c.id === id);
      if (idx === -1) return res.status(404).json({ error: 'not found' });
      const existing = all[idx].translations && all[idx].translations[lang];
      if (existing) return res.status(200).json({ text: existing });

      const key = process.env.ANTHROPIC_API_KEY;
      const translated = key ? await translateOnce(key, all[idx].text, lang) : null;
      if (!translated) return res.status(200).json({ text: all[idx].text }); // 실패 시 원문 그대로
      all[idx].translations = Object.assign({}, all[idx].translations, { [lang]: translated });
      await kvReplaceAll('guestbook:comments', all);
      return res.status(200).json({ text: translated });
    }

    if (req.method === 'POST') {
      const { name, text, parentId, hp } = body || {};
      if (hp) return res.status(200).json({ ok: true }); // 허니팟 필드가 채워졌으면 봇으로 간주 — 저장 없이 성공만 응답
      const trimmed = String(text || '').trim();
      if (!trimmed) return res.status(400).json({ error: '내용을 입력해주세요.' });
      if (trimmed.length > MAX_TEXT_LEN) return res.status(400).json({ error: '너무 길어요 (' + MAX_TEXT_LEN + '자 이내로).' });

      const all = await kvListAll('guestbook:comments');
      if (parentId && !all.some(c => c.id === parentId)) return res.status(400).json({ error: '답글 대상을 찾을 수 없어요.' });

      const ipHash = hashIp(clientIp(req));
      const recent = all.slice(-RECENT_SCAN).filter(c => c.ipHash === ipHash).sort((a, b) => b.createdAt - a.createdAt);
      if (recent.length && Date.now() - recent[0].createdAt < COOLDOWN_MS) {
        return res.status(429).json({ error: '너무 빨리 연달아 남겼어요. 잠시 후 다시 시도해주세요.' });
      }

      const record = {
        id: 'gb-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
        parentId: parentId || null,
        name: String(name || '').trim().slice(0, MAX_NAME_LEN) || null,
        text: trimmed,
        createdAt: Date.now(),
        translations: {},
        ipHash,
      };
      await kvPushJSON('guestbook:comments', record);
      return res.status(200).json({ ok: true, comment: publicShape(record) });
    }

    if (req.method === 'DELETE') {
      if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: '로그인이 필요해요.' });
      const { id } = body || {};
      const all = await kvListAll('guestbook:comments');
      const toRemove = collectDescendantIds(all, id); // 댓글을 지우면 거기 달린 답글도 함께 지운다(고아 답글 방지)
      await kvReplaceAll('guestbook:comments', all.filter(c => !toRemove.has(c.id)));
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'method' });
  } catch (e) {
    res.status(503).json({ error: 'storage not ready: ' + e.message });
  }
};
