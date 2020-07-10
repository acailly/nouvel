const fs = require("fs");
const path = require("path");
const configuration = require("../configuration");

module.exports = function (key) {
  const keyPath = key.split("/");
  const keyFolders = keyPath.slice(0, -1);
  const keyFile = keyPath.slice(-1);
  const filePath = path.join(
    configuration.rootDataFolder,
    ...keyFolders,
    `${keyFile}.json`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const rawValue = fs.readFileSync(filePath);
  return JSON.parse(rawValue);
};
