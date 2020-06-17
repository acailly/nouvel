const fs = require("fs");
const path = require("path");

module.exports = function (targetFilePath, content) {
  fs.writeFileSync(targetFilePath, content);
};
