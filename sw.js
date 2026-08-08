self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('karo-store-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/accounts.js',
        '/MlbbLogo.jpeg',
        '/PubgLogo.jpeg',
        '/Arrow.png',
        '/Loading.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
