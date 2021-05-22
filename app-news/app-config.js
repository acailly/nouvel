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
      return;
    }
    next();
  });

  // LOGIN
  // views
  app.get("/", require("./views/login"));
  // actions
  app.post("/unlock", require("./actions/unlock"));

  // NEWS
  // views
  app.get("/news", require("./views/news"));
  // actions
  app.post("/remove-news-item", require("./actions/removeNewsItem"));
  app.post("/remove-all-news-item", require("./actions/removeAllNewsItem"));

  // FEEDS
  // views
  app.get("/feeds", require("./views/feeds"));
  app.get("/add-feed", require("./views/addFeed"));
  app.get("/add-rss-feed", require("./views/addRSSFeed"));
  app.get("/add-youtube-feed", require("./views/addYoutubeFeed"));
  app.get(
    "/add-twitter-home-timeline-feed",
    require("./views/addTwitterHomeTimelineFeed")
  );
  app.get("/fetch-feeds-status", require("./views/fetchFeedsStatus"));
  // actions
  app.post("/new-rss-feed", require("./actions/newRSSFeed"));
  app.post("/new-youtube-feed", require("./actions/newYoutubeFeed"));
  app.post(
    "/new-twitter-home-timeline-feed",
    require("./actions/newTwitterHomeTimelineFeed")
  );
  app.post("/fetch-feeds", require("./actions/fetchFeeds"));
  app.post("/fetch-feeds-status", require("./actions/fetchFeedsStatus"));
  app.post("/remove-feed", require("./actions/removeFeed"));

  // REMOTES
  // views
  app.get("/remotes", require("./views/remotes"));
  // actions
  app.post("/new-remote", require("./actions/newRemote"));
  app.post("/remove-remote", require("./actions/removeRemote"));

  // DEV TOOLS
  // views
  app.get("/dev", require("./views/dev"));
  // actions
  app.post("/edit-doc", require("./actions/editDoc"));
  app.post("/remove-doc", require("./actions/removeDoc"));
  app.post(
    "/remove-fetch-feed-status",
    require("./actions/removeFetchFeedStatus.js")
  );

  // SYNC STATUS
  // actions
  app.post("/fetch-sync-status", require("./actions/fetchSyncStatus"));
  app.post("/reload-page", require("./actions/reloadPage"));

  // 404
  // views
  app.use(require("./views/404"));
};
