const path = require("path");
const express = require("express");
const ejs = require("ejs");

const configuration = require("../configuration");

// VIEWS
const viewIndex = require("./views/index");
const view404 = require("./views/404");

// ACTIONS
const actionNewItem = require("./actions/newItem");

module.exports = function () {
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  // from https://github.com/mde/ejs/wiki/Using-EJS-with-Express#custom-render-function
  let ejsOptions = { async: true };
  app.engine("html", async (path, data, cb) => {
    let html = await ejs.renderFile(path, data, ejsOptions);
    cb(null, html);
  });
  app.set("views", path.join(__dirname, "views"));

  app.use(express.static(path.join(__dirname, "public")));

  // ROUTES
  app.get("/", viewIndex);
  app.post("/new-item", actionNewItem);
  app.use(view404);

  app.listen(configuration.listServerPort);
};
