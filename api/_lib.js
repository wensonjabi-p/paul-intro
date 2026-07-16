/* 공용 헬퍼 — KV(Redis) 접근 + 관리자 세션 서명/검증.
   Vercel Storage(KV/Upstash Redis)를 프로젝트에 연결하면 아래 env가 자동 주입된다. */
const crypto = require('crypto');

function kvEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function kv(...cmd) {
  const env = kvEnv();
  if (!env) throw new Error('KV_NOT_CONFIGURED');
  const r = await fetch(env.url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.token, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  const data = await r.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

async function kvPushJSON(listKey, obj) {
  return kv('RPUSH', listKey, JSON.stringify(obj));
}

async function kvListAll(listKey) {
  const raw = await kv('LRANGE', listKey, '0', '-1');
  return (raw || []).map(s => { try { return JSON.parse(s); } catch (e) { return null; } }).filter(Boolean);
}

/* 항목 하나를 교체(수정/발행토글/삭제 대체)할 때 — 리스트 전체를 다시 쓴다.
   개인 사이트 규모(수백~수천 항목)에서는 충분히 빠르다. */
async function kvReplaceAll(listKey, items) {
  await kv('DEL', listKey);
  if (!items.length) return;
  const args = items.map(i => JSON.stringify(i));
  return kv('RPUSH', listKey, ...args);
}

// ---- admin session (stateless, HMAC-signed cookie) ----
const COOKIE_NAME = 'pb_admin';
const MAX_AGE_SEC = 60 * 60 * 24 * 90; // 90일

function secret() {
  const s = process.env.ADMIN_SECRET;
  if (!s) throw new Error('ADMIN_SECRET_NOT_SET');
  return s;
}

function sign(ts) {
  return crypto.createHmac('sha256', secret()).update(String(ts)).digest('hex');
}

function makeSessionCookie() {
  const ts = Date.now();
  const sig = sign(ts);
  const value = ts + '.' + sig;
  const parts = [
    COOKIE_NAME + '=' + value,
    'Path=/', 'HttpOnly', 'Secure', 'SameSite=Lax',
    'Max-Age=' + MAX_AGE_SEC,
  ];
  return parts.join('; ');
}

function clearSessionCookie() {
  return COOKIE_NAME + '=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';
}

function parseCookies(header) {
  const out = {};
  (header || '').split(';').forEach(p => {
    const i = p.indexOf('=');
    if (i === -1) return;
    out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}

function isValidSession(cookieHeader) {
  try {
    const cookies = parseCookies(cookieHeader);
    const raw = cookies[COOKIE_NAME];
    if (!raw) return false;
    const [ts, sig] = raw.split('.');
    if (!ts || !sig) return false;
    if (Date.now() - Number(ts) > MAX_AGE_SEC * 1000) return false;
    const expected = sign(ts);
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch (e) { return false; }
}

// 모델이 도구 호출 문자열 안에 자기 스캐폴딩(예: </paragraph>, </invoke> 같은 태그)을 실수로
// 흘려 넣는 경우가 드물게 있다 — 특히 긴 자유 서술을 시킬 때. 사용자에게 보여주기 전에 걷어낸다.
function stripModelArtifacts(s) {
  if (typeof s !== 'string') return s;
  return s.replace(/<\/?[a-zA-Z_][a-zA-Z0-9_]*\s*\/?>/g, '').replace(/\s+/g, ' ').trim();
}

module.exports = { kv, kvPushJSON, kvListAll, kvReplaceAll, COOKIE_NAME, makeSessionCookie, clearSessionCookie, isValidSession, stripModelArtifacts };
