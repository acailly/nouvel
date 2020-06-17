const fs = require("fs");

module.exports = function (filePath) {
  return fs.readFileSync(filePath);
};
