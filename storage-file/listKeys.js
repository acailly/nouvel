const fs = require("fs").promises;
const path = require("path");
const configuration = require("../@configuration");
const _fileExists = require("./_fileExists");

module.exports = async function (keyFolder) {
  const keyFolderPath = path.join(configuration.localStorageFolder, keyFolder);

  if (!(await _fileExists(keyFolderPath))) {
    return [];
  }

  const files = await fs.readdir(keyFolderPath);

  const keyFiles = files
    .filter((file) => path.extname(file) === ".json")
    .map((file) => {
      const fileNameWithoutExtension = path.basename(file, ".json");
      return fileNameWithoutExtension;
    });

  return keyFiles;
};
