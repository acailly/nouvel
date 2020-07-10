const fs = require("fs");
const path = require("path");
const mkdirp = require('mkdirp')
const configuration = require("../../configuration");

module.exports = function (key, value) {
  const keyPath = key.split('/')
  const [...keyFolders, keyFile] = keyPath
  const fileDirectory = path.join(configuration.rootDataFolder, ...keyFolders)
  const filePath = path.join(fileDirectory, `${keyFile}.json`)

  if(!fs.existsSync(fileDirectory)){
    mkdirp.sync(fileDirectory)
  }

  fs.writeFileSync(filePath, JSON.stringify(value));
};