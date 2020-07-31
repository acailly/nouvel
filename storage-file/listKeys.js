const fs = require("fs");
const path = require("path");
const configuration = require("../configuration");

module.exports = function (keyFolder) {
  const keyFolderPath = path.join(configuration.rootDataFolder, keyFolder);

  if (!fs.existsSync(keyFolderPath)) {
    return [];
  }

  const files = fs.readdirSync(keyFolderPath);

  const keyFiles = files
    .filter((file) => path.extname(file) === ".json")
    .map((file) => {
      const fileNameWithoutExtension = path.basename(file, ".json");
      return fileNameWithoutExtension;
    });

  return keyFiles;
};