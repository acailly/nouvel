const path = require("path");
const express = require("express");
const ejs = require("ejs");

module.exports = function (folder, appConfig, port) {
  const app = express();

  // from https://github.com/mde/ejs/wiki/Using-EJS-with-Express#custom-render-function
  let ejsOptions = { async: true };
  app.engine("html", async (path, data, cb) => {
    let html = await ejs.renderFile(path, data, ejsOptions);
    cb(null, html);
  });

  app.set("views", path.join(folder, "views"));

  app.use(express.static(path.join(folder, "public")));

  appConfig(app);

  app.listen(port, () => {
    console.log("APP STARTED ON PORT", port, `: http://localhost:${port}`);
  });
};
