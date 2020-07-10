const fs = require("fs");
const path = require("path");
const configuration = require("../../configuration");

module.exports = function (keyPath) {
  const keyPathFolder = path.join(configuration.rootDataFolder, keyPath)

  if(!fs.existsSync(fileDirectory)){
    return []
  }

  const files = fs.readdirSync(keyPathFolder);
  
  const keyFiles = files
    .filter(file => path.extname(file) === '.json')
    .map(file => {
      const fileNameWithoutExtension = path.basename(file, '.json')
      return path.join(keyPathFolder, fileNameWithoutExtension)
    })
  
  return keyFiles
}
