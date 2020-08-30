const path = require("path");
const express = require("express");
const ejs = require("ejs");

const configuration = require("../configuration");

// VIEWS
const viewIndex = require("./views/index");
const view404 = require("./views/404");

// ACTIONS

module.exports = function () {
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  // from https://stackoverflow.com/questions/27383222/is-there-a-way-to-keep-the-file-extension-of-ejs-file-as-html
  app.engine(".html", ejs.__express);

  app.use(express.static(path.join(__dirname, "public")));
  app.set("views", path.join(__dirname, "views"));

  // ROUTES
  app.get("/", viewIndex);
  app.use(view404);

  app.listen(configuration.listServerPort);
};
