const configuration = require("../@configuration");

module.exports = function (appConfig) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./serviceworker.js");
  }

  const browserExpress = require("browser-express");
  const app = browserExpress({
    // See https://github.com/wesleytodd/nighthawk/blob/9bd0f8f94649f648d09886a79a96b5cdec0d132f/README.md#listen-options
    popstate: true,
    // dispatch: true,
    interceptLinks: true,
    interceptFormSubmit: true,
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

  appConfig(app);

  app.listen({}, () => {
    console.log(`APP STARTED (base is ${configuration.deployBaseURL})`);
  });
};
