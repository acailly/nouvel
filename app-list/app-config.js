module.exports = function (app) {
  // MIDDLEWARES
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: false }));

  // VIEWS
  const viewIndex = require("./views/index");
  const view404 = require("./views/404");

  // ACTIONS
  const actionNewItem = require("./actions/newItem");

  // ROUTES
  app.get("/", viewIndex);
  app.post("/new-item", actionNewItem);
  app.use(view404);
};
