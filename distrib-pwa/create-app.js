const configuration = require("../@configuration");
const application = require("../@application");

module.exports = function () {
  const appConfig = application.getConfig();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./serviceworker.js")
        .then((registration) => {
          console.log("[service-worker] registered!");
        })
        .catch((error) => {
          console.error("[service-worker] error during registration", error);
        });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        // This fires when the service worker controlling this page
        // changes, eg a new worker has skipped waiting and become
        // the new active worker.
        console.log("[service-worker] service worker has been updated!");
      });
    });
  }

  const browserExpress = require("../browser-express");
  const app = browserExpress({
    // See https://github.com/wesleytodd/nighthawk/blob/9bd0f8f94649f648d09886a79a96b5cdec0d132f/README.md#listen-options
    popstate: true,
    // dispatch: true,
    interceptLinks: true,
    interceptFormSubmit: true,
    // EDITED CODE : add interceptPostFetch feature
    interceptPostFetch: true,
    // EDITED CODE : add useMorphdom feature
    useMorphdom: true,
    // Set base path for deploy
    base: configuration.deployBaseURL,
  });

  // Log requests
  // app.use((req, res, next) => {
  //   console.log("DEBUG", "REQUEST", req);
  //   next();
  // });

  // Implements res.render() in browser
  const universalRenderMiddleware = require("./universal-render-middleware");
  app.use(universalRenderMiddleware());

  // Monkey path res.redirect() in browser to handle base URL
  const redirectWithBaseURLMiddleware = require("./redirect-with-base-url-middleware");
  app.use(redirectWithBaseURLMiddleware());

  appConfig(app);

  app.listen({}, () => {
    console.log(`APP STARTED (base is ${configuration.deployBaseURL})`);
  });
};
