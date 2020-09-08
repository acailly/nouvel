// Set up service worker event listener
self.addEventListener("fetch", (event) => {
  // Will test event.request against the defined routes
  // and use event.respondWith(handler) when a route matches
  console.log("DEBUG SW", event.request)
});
