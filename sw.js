/* 오프라인 캐시 — 인터뷰 앱을 비행기 모드에서도 열 수 있게. */
const CACHE = 'paul-interview-v7';
const ASSETS = [
  './interview.html',
  './interview-questions.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 질문 파일은 네트워크 우선(최신 질문 반영), 나머지는 캐시 우선. */
self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (url.includes('interview-questions.js')) {
    e.respondWith(
      fetch(e.request).then(r => {
        const clone = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return r;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
