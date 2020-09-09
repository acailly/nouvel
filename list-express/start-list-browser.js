process.versions.node = undefined // to fix the iconv-lite error with streams

const browserExpress = require('browser-express');
const ejs = require("ejs");
const bodyParser = require("body-parser");

// registerServiceWorker();

// VIEWS
const viewIndex = require("./views/index");
const view404 = require("./views/404");

// ACTIONS
const actionNewItem = require("./actions/newItem");

// const { Router } = require("tiny-request-router");
// const router = new Router();
// // ROUTES
// router.get("/", viewIndex);
// router.post("/new-item", actionNewItem);

// const Nighthawk = require("nighthawk");
// const app = Nighthawk();

const app = browserExpress({  
  interceptFormSubmit: true
});

app.use(bodyParser.urlencoded({ extended: false }));

// Implements res.render() in browser
app.use(universalRenderMiddleware());

// ROUTES
app.get("/", viewIndex);
app.post("/new-item", actionNewItem);
app.use(view404);

app.listen({}, () => {
  console.log('Browser-Express is started!');
});

function universalRenderMiddleware() {
  return (req, res, next) => {
    const isBrowser = res.get === res.set; // both set to noop by nighthawk (https://github.com/wesleytodd/nighthawk/blob/master/lib/response.js#L63)
    if (isBrowser) {
      // Warning! It is a partial implementation
      // Express doc is here: https://expressjs.com/fr/4x/api.html#res.render
      res.render = renderView;
    } else {
      // res.render() is already defined when running with node+express
    }

    next();
  };
}

async function renderView(view, data) {
  const response = await fetch(`/views/${view}`);
  const template = await response.text();

  const compiledTemplate = ejs.compile(template, {
    client: true,
    async: true,
  });
  const html = await compiledTemplate(data, null, async (includedPath) => {
    const includeResponse = await fetch(`/views/${includedPath}`);
    const includedTemplate = await includeResponse.text();
    return includedTemplate;
  });
  document.getElementById("root").innerHTML = html;
}
// window.renderView = renderView;

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then(function () {
      console.log("Service Worker Registered");

      navigator.serviceWorker.onmessage = (event) => {
        console.log("DEBUG onmessage", event.data);
        if (event.data && event.data.type === "REQUEST") {
          // const { method, pathname } = event.data;
          // const match = router.match(method, pathname);
          // if (match) {
          //   console.log("DEBUG match!");
          //   match.handler(match.params);
          // }

          const { method, originalUrl, path, url, body } = event.data;

          if (method !== "POST") {
            return;
          }

          const strippedPath = app._base ? path.replace(app._base, "") : path;

          const requestUrl =
            (strippedPath === "" ? "/" : strippedPath) + url.search + +url.hash;

          // Create the request object
          const req = new Nighthawk.Request();
          req.app = app;
          req.method = method;
          req.originalUrl = originalUrl;
          req.baseUrl = app._base;
          req.path = strippedPath;
          req.url = requestUrl;
          req.body = body;

          // Create the response object
          const res = new Nighthawk.Response();
          res.app = app;

          app(req, res, function (e) {
            if (e) {
              throw e;
            }
          });
        }
      };

      console.log("Listener Registered");
    });
  }
}
