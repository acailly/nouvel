const ejs = require("ejs");
const configuration = require("../@configuration");

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
  const baseURL = configuration.deployBaseURL || "";
  const globalData = {
    baseURL,
  };

  const response = await fetch(`${baseURL}/views/${view}`);
  const template = await response.text();

  const html = await compileTemplate(template, data, globalData, "");
  this.send(html);
}

async function compileTemplate(
  template,
  data,
  globalData,
  relativeIncludePath
) {
  const templateData = { ...data, ...globalData };
  const compiledTemplate = ejs.compile(template, {
    client: true,
    async: true,
  });
  const html = await compiledTemplate(
    templateData,
    null,
    async (includedTemplatePath, includedTemplateData) => {
      const includeResponse = await fetch(
        `${globalData.baseURL}/views/${relativeIncludePath}${includedTemplatePath}`
      );
      const includedTemplate = await includeResponse.text();
      let childRelativeIncludePath = relativeIncludePath || "";
      if (includedTemplatePath && includedTemplatePath.indexOf("/") !== -1) {
        const splittedPath = includedTemplatePath.split("/");
        const childDirectory = splittedPath.slice(0, -1).join("/");
        childRelativeIncludePath = `${childRelativeIncludePath}${childDirectory}/`;
      }
      return await compileTemplate(
        includedTemplate,
        includedTemplateData,
        globalData,
        childRelativeIncludePath
      );
    }
  );
  return html;
}
