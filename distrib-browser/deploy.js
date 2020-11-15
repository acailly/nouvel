const path = require("path");
const ghpages = require("gh-pages");
const configuration = require("../@configuration");

const baseUrlPath = configuration.deployBaseURL || "";
const outputPath = path.join(
  __dirname,
  "..",
  "output",
  "distrib-browser",
  baseUrlPath
);

function deploy() {
  ghpages.publish(outputPath, function (err) {});
}

deploy();
