const Nighthawk = require("nighthawk");
const ejs = require("ejs");

// VIEWS
const viewIndex = require("./views/index");
const view404 = require("./views/404");

// ACTIONS
const actionNewItem = require("./actions/newItem");

function start() {
  const app = Nighthawk();

  // TODO ACY vvvv Not replaced yet vvvvv

  // app.use(express.urlencoded({ extended: true }));

  // // from https://github.com/expressjs/express/blob/master/lib/application.js#L274
  // app.engine("html", ejs.renderFile);

  // app.use(express.static(path.join(__dirname, "public")));
  // app.set("views", path.join(__dirname, "views"));

  // TODO ACY ^^^^^^^^^^^^

  // Implements res.render() in browser
  app.use(universalRenderMiddleware());

  // ROUTES
  app.get("/", viewIndex);
  app.post("/new-item", actionNewItem);
  app.use(view404);

  app.listen();
}

start();

function universalRenderMiddleware() {
  return (req, res, next) => {
    const isBrowser = res.get === res.set; // both set to noop by nighthawk (https://github.com/wesleytodd/nighthawk/blob/master/lib/response.js#L63)
    if (isBrowser) {
      // Warning! It is a partial implementation
      // Express doc is here: https://expressjs.com/fr/4x/api.html#res.render
      res.render = async (view, locals) => {
        const response = await fetch(`/views/${view}`);
        const template = await response.text();

        const compiledTemplate = ejs.compile(template, {
          client: true,
          async: true,
        });
        const html = await compiledTemplate(
          locals,
          null,
          async (includedPath) => {
            const includeResponse = await fetch(`/views/${includedPath}`);
            const includedTemplate = await includeResponse.text();
            return includedTemplate;
          }
        );
        document.getElementById("root").innerHTML = html;
      };
    } else {
      // res.render() is already defined when running with node+express
    }

    next();
  };
}
