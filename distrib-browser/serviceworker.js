const version = "v1";

const baseUrl = location.href.slice(0, -"serviceworker.js".length);
console.log("[service-worker] Base URL is", baseUrl);

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

self.addEventListener("fetch", async function (event) {
  // TL;DR; Strategy: Cache falling back to app falling back the network

  event.respondWith(
    // Start searching in the cache...
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }

        //... if not found, look if it is an URL of an app page
        if (event.request.url.startsWith(baseUrl)) {
          return caches.match(`${baseUrl}index.html`);
        }
      })
      //... else fallback to the network
      .then((response) => {
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
