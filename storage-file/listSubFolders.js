const fs = require("fs").promises;
const path = require("path");
const configuration = require("../configuration");
const exists = require('./exists')

module.exports = async function (keyFolder) {
  const keyFolderPath = path.join(configuration.rootDataFolder, keyFolder);

  if (!(await exists(keyFolderPath))) {
    return [];
  }

  const files = await fs.readdir(keyFolderPath);

  const subFolders = await Promise.all(
    files.filter(async (file) =>
      await fs.lstat(path.join(keyFolderPath, file)).isDirectory()
    )
  );

  return subFolders;
};
