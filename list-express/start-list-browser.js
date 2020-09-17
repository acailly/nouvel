module.exports = function () {
  const browserExpress = require("browser-express");
  const app = browserExpress({
    interceptFormSubmit: true,
  });

  const commonAppConfig = require("./common-app-config");
  commonAppConfig(app);

  app.listen({}, () => {
    console.log("APP STARTED");
  });
};
