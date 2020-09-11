const path = require("path");
const express = require("express");
const ejs = require("ejs");

const configuration = require("../configuration");

module.exports = function () {
  const app = express();

  // from https://github.com/mde/ejs/wiki/Using-EJS-with-Express#custom-render-function
  let ejsOptions = { async: true };
  app.engine("html", async (path, data, cb) => {
    let html = await ejs.renderFile(path, data, ejsOptions);
    cb(null, html);
  });

  app.set("views", path.join(__dirname, "views"));

  app.use(express.static(path.join(__dirname, "public")));

  const commonAppConfig = require("./common-app-config");
  commonAppConfig(app);

  app.listen(configuration.listServerPort, () => {
    console.log("APP STARTED ON PORT", configuration.listServerPort);
  });
};
