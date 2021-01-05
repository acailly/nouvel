const path = require("path");

module.exports = {
  getConfig: () => require("./app-config"),
  rootPath: __dirname,
  publicPath: path.join(__dirname, "public"),
  viewsPath: path.join(__dirname, "views"),
};
