const version = "v1";

// Declare filesToCache variable
self.importScripts("./filesToCache.js");

// Declare serviceWorkerConfiguration variable
self.importScripts("./serviceworker-configuration.js");

const baseUrl = serviceWorkerConfiguration.baseUrl;
console.log("[service-worker] Base URL is", baseUrl);

self.addEventListener("install", function (event) {
  console.log("[service-worker] installation");

  // Add all the ressources in the cache
  event.waitUntil(
    caches.open(version).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );

  // Force this service worker to become the active service worker
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("[service-worker] activation");
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
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch((e) => {
        //... if this is an error in cors mode, retry with a CORS proxy
        if (event.request.mode === "cors") {
          const corsProxifiedURL = `${serviceWorkerConfiguration.corsProxyURL}${event.request.url}`;
          // From https://stackoverflow.com/a/35421858
          const proxifiedRequest = new Request(corsProxifiedURL, {
            method: event.request.method,
            headers: event.request.headers,
            mode: event.request.mode,
            credentials: event.request.credentials,
            redirect: event.request.redirect,
          });
          return fetch(proxifiedRequest);
        }

        throw e;
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
