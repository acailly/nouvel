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
  const viewRemotes = require("./views/remotes");
  const viewDev = require("./views/dev");
  const viewStatus = require("./views/status");
  const view404 = require("./views/404");

  // ACTIONS
  const actionUnlock = require("./actions/unlock");
  const actionNewFeed = require("./actions/newFeed");
  const actionNewRemote = require("./actions/newRemote");
  const actionRemoveRemote = require("./actions/removeRemote");
  const actionFetchFeeds = require("./actions/fetchFeeds");
  const removeNewsItem = require("./actions/removeNewsItem");
  const removeAllNewsItem = require("./actions/removeAllNewsItem");
  const actionEditDoc = require("./actions/editDoc");
  const actionRemoveDoc = require("./actions/removeDoc");

  // ROUTES
  app.get("/", viewLogin);
  app.post("/unlock", actionUnlock);

  app.get("/news", viewNews);
  app.post("/remove-news-item", removeNewsItem);
  app.post("/remove-all-news-item", removeAllNewsItem);

  app.get("/feeds", viewFeeds);
  app.post("/new-feed", actionNewFeed);
  app.post("/fetch-feeds", actionFetchFeeds);

  app.get("/remotes", viewRemotes);
  app.post("/new-remote", actionNewRemote);
  app.post("/remove-remote", actionRemoveRemote);

  app.get("/dev", viewDev);
  app.post("/edit-doc", actionEditDoc);
  app.post("/remove-doc", actionRemoveDoc);

  app.get("/status", viewStatus);

  app.use(view404);
};
