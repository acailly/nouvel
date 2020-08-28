const fs = require("fs");
const path = require("path");
const execShellCommand = require("./execShellCommand");

const syncFolder = require("./sync-folder");

module.exports = async function (folder, repository) {
  console.log("Syncing git - Starting to synchronize with git remote:", repository.name);

  // Check remote repository is registered

  try {
    await execShellCommand(
      `git remote get-url ${repository.name}`,
      folder
    );
  } catch (e) {
    console.log("Syncing git - Remote repository doesn't exist, add it");
    await execShellCommand(
      `git remote add ${repository.name} ${repository.remoteRepository}`,
      folder
    );
  }

  // Starts syncing

  await syncFolder(folder, repository);
  setInterval(async () => {
    await syncFolder(folder, repository);
  }, repository.syncPeriodInMs || 10000);
};
