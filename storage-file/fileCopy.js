const fs = require("fs");
const path = require("path");

// Inspired by https://stackoverflow.com/a/26038979

module.exports = function (sourceFilePath, targetFolderOrFilePath) {
  let targetFile = targetFolderOrFilePath;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(targetFolderOrFilePath)) {
    if (fs.lstatSync(targetFolderOrFilePath).isDirectory()) {
      targetFile = path.join(
        targetFolderOrFilePath,
        path.basename(sourceFilePath)
      );
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(sourceFilePath));
};
