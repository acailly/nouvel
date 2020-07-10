const fs = require("fs");
const path = require("path");
const configuration = require("../configuration");

module.exports = function (keyFolder) {
  const keyFolderPath = path.join(configuration.rootDataFolder, keyFolder);

  if (!fs.existsSync(keyFolderPath)) {
    return [];
  }

  const files = fs.readdirSync(keyFolderPath);

  const subFolders = files.filter((file) =>
    fs.lstatSync(path.join(keyFolderPath, file)).isDirectory()
  );

  return subFolders;
};
