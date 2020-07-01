const fs = require("fs");
const path = require("path");
const fileCopy = require("./fileCopy");
const folderNew = require("./folderNew");

// Inspired by https://stackoverflow.com/a/26038979

function folderCopy(sourceFolderPath, targetFolderPath) {
  let files = [];

  let targetFolder;
  // The target folder already exists, we create a subfolder and copy in this subfolder
  if (fs.existsSync(targetFolderPath)) {
    targetFolder = path.join(
      targetFolderPath,
      path.basename(sourceFolderPath)
    );
    folderNew(targetFolder);  
  }
  // The target folder doesn't exist, we create it and copy in it
  else{
    targetFolder = targetFolderPath
    folderNew(targetFolder);
  }
  
  if (fs.lstatSync(sourceFolderPath).isDirectory()) {
    files = fs.readdirSync(sourceFolderPath);
    files.forEach(function (file) {
      const currentFileOrFolder = path.join(sourceFolderPath, file);
      if (fs.lstatSync(currentFileOrFolder).isDirectory()) {
        folderCopy(currentFileOrFolder, targetFolder);
      } else {
        fileCopy(currentFileOrFolder, targetFolder);
      }
    });
  }
}

module.exports = folderCopy;
