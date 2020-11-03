const fs = require("fs").promises;
const path = require("path");
const mkdirp = require("mkdirp");
const configuration = require("../@configuration");
const exists = require("./exists");

module.exports = async function (key, value) {
  const keyPath = key.split("/");
  const keyFolders = keyPath.slice(0, -1);
  const keyFile = keyPath.slice(-1);
  const fileDirectory = path.join(configuration.rootDataFolder, ...keyFolders);
  const filePath = path.join(fileDirectory, `${keyFile}.json`);

  if (!(await exists(fileDirectory))) {
    await mkdirp(fileDirectory);
  }

  await fs.writeFile(filePath, JSON.stringify(value));
};
