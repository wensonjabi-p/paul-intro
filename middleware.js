/* Edge Middleware — /admin.html 접근을 서명된 쿠키로 게이트. */
export const config = { matcher: ['/admin.html', '/admin'] };

function parseCookies(header) {
  const out = {};
  (header || '').split(';').forEach(p => {
    const i = p.indexOf('=');
    if (i === -1) return;
    out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}

async function hmacHex(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export default async function middleware(req) {
  const secret = process.env.ADMIN_SECRET;
  const cookies = parseCookies(req.headers.get('cookie'));
  const raw = cookies['pb_admin'];
  let ok = false;

  if (raw && secret) {
    const [ts, sig] = raw.split('.');
    if (ts && sig && Date.now() - Number(ts) < 1000 * 60 * 60 * 24 * 90) {
      const expected = await hmacHex(secret, ts);
      ok = expected === sig;
    }
  }

  if (!ok) {
    return Response.redirect(new URL('/admin-login.html', req.url), 302);
  }
}
