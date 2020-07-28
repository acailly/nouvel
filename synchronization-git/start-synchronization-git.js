const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const configuration = require("../configuration");
const execShellCommand = require("./execShellCommand");

const syncFolders = require("./sync-folders");

module.exports = async function () {
  console.log("Starting to synchronize on git:", configuration.folderToSync);
  
  if (!fs.existsSync(configuration.folderToSync)) {
    console.log("Folder doesn't exist, create it");
    mkdirp.sync(configuration.folderToSync);
  }
  
  const gitRepositoryPath = path.join(configuration.folderToSync, '.git')
  if (!fs.existsSync(gitRepositoryPath)) {
    console.log("Git repository doesn't exist, clone it");
    await execShellCommand(
      `git clone ${configuration.remoteRepository} .`,
      configuration.folderToSync
    );
  }

  await syncFolders([configuration.folderToSync]);
  setInterval(async () => {
    await syncFolders([configuration.folderToSync]);
  }, configuration.syncPeriodInMs || 10000);
};
