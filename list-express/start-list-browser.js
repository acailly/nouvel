// const path = require("path");
const Nighthawk = require("nighthawk");
// const ejs = require("ejs");

// VIEWS
const viewIndex = require("./views/index");
const view404 = require("./views/404");

// ACTIONS
const actionNewItem = require("./actions/newItem");

module.exports = function () {
  const app = Nighthawk();

  // TODO ACY vvvv Not replaced yet vvvvv

  // app.use(express.urlencoded({ extended: true }));

  // // from https://stackoverflow.com/questions/27383222/is-there-a-way-to-keep-the-file-extension-of-ejs-file-as-html
  // app.engine(".html", ejs.__express);

  // app.use(express.static(path.join(__dirname, "public")));
  // app.set("views", path.join(__dirname, "views"));

  // TODO ACY ^^^^^^^^^^^^

  // ROUTES
  app.get("/", viewIndex);
  app.post("/new-item", actionNewItem);
  app.use(view404);

  app.listen();
};
