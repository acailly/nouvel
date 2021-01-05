const path = require("path");
const express = require("express");
const ejs = require("ejs");
const configuration = require("../@configuration");
const application = require("../@application");

module.exports = function () {
  const appConfig = application.getConfig();
  const port = configuration.nodeServerPort;

  const app = express();

  // from https://github.com/mde/ejs/wiki/Using-EJS-with-Express#custom-render-function
  let ejsOptions = { async: true };
  app.engine("html", async (path, data, cb) => {
    let html = await ejs.renderFile(path, data, ejsOptions);
    cb(null, html);
  });

  app.set("views", application.viewsPath);

  app.use(express.static(application.publicPath));

  appConfig(app);

  app.listen(port, () => {
    console.log("APP STARTED ON PORT", port, `: http://localhost:${port}`);
  });
};
