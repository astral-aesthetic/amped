// Service Worker for cache management
const CACHE_VERSION = 'v1-gg-' + new Date().getTime();
const ASSETS_CACHE = CACHE_VERSION + '-assets';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(ASSETS_CACHE).then(() => {
      self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== ASSETS_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Always fetch HTML files fresh
  if (event.request.url.includes('.html')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Cache assets
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((response) => {
        const clonedResponse = response.clone();
        caches.open(ASSETS_CACHE).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return response;
      });
    }).catch(() => {
      // Fallback for offline
      return fetch(event.request);
    })
  );
});
