const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const configuration = require("../@configuration");

module.exports = function () {
  const secretsFileDirectoryPath = path.dirname(configuration.secretsFile);
  if (!fs.existsSync(secretsFileDirectoryPath)) {
    console.log("Secrets folder doesn't exist, create it");
    mkdirp.sync(secretsFileDirectoryPath);
  }

  if (!fs.existsSync(configuration.secretsFile)) {
    console.log("Secrets file doesn't exist, generate it");
    const secrets = {};
    fs.writeFileSync(configuration.secretsFile, JSON.stringify(secrets));
  }

  const rawValue = fs.readFileSync(configuration.secretsFile);
  return JSON.parse(rawValue);
};
