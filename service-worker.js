// Service worker limpo - versão 3 - limpa caches antigos
const CACHE_NAME = 'matrix-v3';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) {
        return caches.delete(key);
      }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Sem cache - tudo direto da rede
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request));
});
