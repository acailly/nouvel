module.exports = function (app) {
  // MIDDLEWARES
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: false }));

  // VIEWS
  const viewIndex = require("./views/index");
  const viewRepositories = require("./views/repositories");
  const view404 = require("./views/404");

  // ACTIONS
  const actionNewItem = require("./actions/newItem");
  const actionNewRepository = require("./actions/newRepository");

  // ROUTES
  app.get("/", viewIndex);
  app.post("/new-item", actionNewItem);
  app.get("/repositories", viewRepositories);
  app.post("/new-repository", actionNewRepository);
  app.use(view404);
};
