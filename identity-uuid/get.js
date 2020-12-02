const path = require("path");
const fs = require("fs");
const makeDir = require("make-dir");
const configuration = require("../@configuration");
const generate = require("./generate");

module.exports = function () {
  const identityFileDirectoryPath = path.dirname(configuration.identityFile);
  if (!fs.existsSync(identityFileDirectoryPath)) {
    console.log("Identity folder doesn't exist, create it");
    makeDir.sync(identityFileDirectoryPath);
  }

  if (!fs.existsSync(configuration.identityFile)) {
    console.log("Identity file doesn't exist, generate it");
    const identity = generate();
    fs.writeFileSync(configuration.identityFile, JSON.stringify(identity));
  }

  const rawValue = fs.readFileSync(configuration.identityFile);
  return JSON.parse(rawValue);
};
