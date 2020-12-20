const { isLocked } = require("../@secrets");

module.exports = function (app) {
  // MIDDLEWARES
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: false }));
  // Redirect to / if app is locked
  const unsecuredRoutes = ["/", "/unlock"];
  app.use((req, res, next) => {
    if (unsecuredRoutes.indexOf(req.path) === -1 && isLocked()) {
      res.redirect(302, "/");
    }
    next();
  });

  // VIEWS
  const viewLogin = require("./views/login");
  const viewNews = require("./views/news");
  const viewFeeds = require("./views/feeds");
  const viewRepositories = require("./views/repositories");
  const view404 = require("./views/404");

  // ACTIONS
  const actionUnlock = require("./actions/unlock");
  const actionNewFeed = require("./actions/newFeed");
  const actionNewRepository = require("./actions/newRepository");
  const actionFetchFeeds = require("./actions/fetchFeeds");
  const removeNewsItem = require("./actions/removeNewsItem");

  // ROUTES
  app.get("/", viewLogin);
  app.post("/unlock", actionUnlock);

  app.get("/news", viewNews);
  app.post("/remove-news-item", removeNewsItem);

  app.get("/feeds", viewFeeds);
  app.post("/new-feed", actionNewFeed);
  app.post("/fetch-feeds", actionFetchFeeds);

  app.get("/repositories", viewRepositories);
  app.post("/new-repository", actionNewRepository);

  app.use(view404);
};
