module.exports = function (app) {
  // MIDDLEWARES
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: false }));

  // VIEWS
  const viewNews = require("./views/news");
  const viewFeeds = require("./views/feeds");
  const viewRepositories = require("./views/repositories");
  const view404 = require("./views/404");

  // ACTIONS
  const actionNewFeed = require("./actions/newFeed");
  const actionNewRepository = require("./actions/newRepository");
  const actionFetchFeeds = require("./actions/fetchFeeds");

  // ROUTES
  app.get("/", viewNews);
  app.get("/feeds", viewFeeds);
  app.post("/new-feed", actionNewFeed);
  app.post("/fetch-feeds", actionFetchFeeds);
  app.get("/repositories", viewRepositories);
  app.post("/new-repository", actionNewRepository);
  app.use(view404);
};
