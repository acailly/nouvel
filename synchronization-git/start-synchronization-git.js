const fs = require("fs");
const mkdirp = require("mkdirp");
const configuration = require("../configuration");
const syncRepository = require("./sync-repository");

module.exports = function () {
  console.log("Starting to synchronize on git:", configuration.rootDataFolder);

  if (!fs.existsSync(configuration.rootDataFolder)) {
    console.log("Folder doesn't exist, create it");
    mkdirp.sync(configuration.rootDataFolder);
  }

  configuration.repositoriesToSync.forEach(repository => {
    syncRepository(repository)
  })
};
