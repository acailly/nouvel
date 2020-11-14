const ejs = require("ejs");

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

module.exports = universalRenderMiddleware;

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
  this.send(html);
}
