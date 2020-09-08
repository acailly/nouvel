self.addEventListener("fetch", async (event) => {
  console.log("DEBUG SW", event.request);

  const request = event.request;
  const url = request.url;
  const body = await request.text();
  // const { pathname } = new URL(request.url);
  const message = {
    type: "REQUEST",
    method: request.method,
    originalUrl: url.pathname + url.search + url.hash,
    path: request.path,
    url: request.url,
    body: body,
  };

  self.clients
    .matchAll({
      includeUncontrolled: true,
      type: "window",
    })
    .then((clients) => {
      if (clients && clients.length) {
        console.log("DEBUG postMessage", message);
        clients[0].postMessage(message);
      }
    });
});
