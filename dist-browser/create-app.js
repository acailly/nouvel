module.exports = function (appConfig) {
  const browserExpress = require("browser-express");
  const app = browserExpress({
    interceptFormSubmit: true,
  });

  // Implements res.render() in browser
  const universalRenderMiddleware = require("./universal-render-middleware");
  app.use(universalRenderMiddleware());

  appConfig(app);

  app.listen({}, () => {
    console.log("APP STARTED");
  });
};
