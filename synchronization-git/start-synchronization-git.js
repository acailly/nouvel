const configuration = require("../configuration");

const syncFolders = require("./sync-folders");

module.exports = async function () {
  console.log("Starting to synchronize on git:", configuration.foldersToSync);
  await syncFolders(configuration.foldersToSync);
  setInterval(async () => {
    await syncFolders(configuration.foldersToSync);
  }, configuration.syncPeriodInMs || 10000);
};
