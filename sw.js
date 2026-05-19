const VERSION    = '2026.05.13-v1.0';      // ← 每次只改這一行
const CACHE_NAME = `prime-matrix-${VERSION}`;

self.addEventListener('message', (e) => {
  if (e.data === 'GET_VERSION') {
    e.source.postMessage({ type: 'VERSION', version: VERSION });
  }
});

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.map(n => n !== CACHE_NAME && caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
