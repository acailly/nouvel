module.exports = function () {

  BrowserFS.configure(
    {
      fs: "IndexedDB",
      options: {
        storeName: "app",
      },
    },
    function (e) {
      if (e) {
        throw e;
      }
      console.log("BrowserFS is ready-to-use!");
    }
  );

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
