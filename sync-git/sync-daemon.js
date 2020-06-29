const syncFolders = require("./sync-folders");

module.exports = async function (folders, refreshRateInMs) {
  console.log("Starting to synchronize on git:", folders);
  await syncFolders(folders);
  setInterval(async () => {
    await syncFolders(folders);
  }, refreshRateInMs || 10000);
};