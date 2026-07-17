/* 오프라인 캐시 — 인터뷰 앱과 관리자 페이지를 비행기 모드에서도 열 수 있게. */
const CACHE = 'paul-interview-v39';
const ASSETS = [
  './interview.html',
  './interview-questions.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './admin.html',
  './admin-login.html',
  './index.html',
  './data.js',
  './data.en.js',
  './data.zh.js',
];

/* 관리자 GET 엔드포인트 — 네트워크 우선, 실패하면 마지막으로 받아둔 데이터를 보여준다(오프라인 열람용). */
const STALE_OK_GET = ['/api/photos-manage', '/api/thoughts', '/api/interview-list'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirstThenCache(request) {
  return fetch(request).then(r => {
    const clone = r.clone();
    if (r.ok) caches.open(CACHE).then(c => c.put(request, clone));
    return r;
  }).catch(() => caches.match(request));
}

self.addEventListener('fetch', e => {
  const url = e.request.url;

  if (url.includes('interview-questions.js')) {
    e.respondWith(networkFirstThenCache(e.request));
    return;
  }

  if (e.request.method === 'GET' && STALE_OK_GET.some(p => url.includes(p))) {
    e.respondWith(networkFirstThenCache(e.request));
    return;
  }

  // 그 외 API 호출(POST/PATCH/DELETE)은 절대 캐시하지 않고 그대로 네트워크로 — 실패하면 앱이 직접 감지해 재시도 큐에 넣는다.
  if (url.includes('/api/')) return;

  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
