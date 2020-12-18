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

  const fileIsDirectory = await Promise.all(
    files.map(async (file) => {
      const stats = await fs.lstat(path.join(keyFolderPath, file));
      return stats.isDirectory();
    })
  );

  const subFolders = files.filter((_, index) => fileIsDirectory[index]);

  return subFolders;
};
