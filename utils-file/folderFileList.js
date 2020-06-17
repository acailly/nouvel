const fs = require("fs");
const path = require("path");

module.exports = function (folderPath) {
  const files = fs.readdirSync(folderPath);
  
  const fullPathFiles = files.map(file => path.join(folderPath, file))
  
  return fullPathFiles
}
