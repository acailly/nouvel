const version = "v1";

// Declare filesToCache variable
self.importScripts("./filesToCache.js");

self.addEventListener("install", function (event) {
  // Add all the ressources in the cache
  event.waitUntil(
    caches.open(version).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );

  // Force this service worker to become the active service worker
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("fetch", function (event) {
  // Special case for root URL '/' => open '/index.html'
  var requestURL = new URL(event.request.url);
  if (requestURL.origin === location.origin) {
    if (requestURL.pathname === "/") {
      event.respondWith(caches.match("/index.html"));
      return;
    }
  }

  // Strategy: Cache falling back to the network
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", function (event) {
  // Remove old caches
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return !cacheName.startsWith(version);
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );

  // Set this service worker as clients' active service worker
  event.waitUntil(self.clients.claim());
});
