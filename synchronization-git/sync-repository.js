const fs = require("fs");
const path = require("path");
const execShellCommand = require("./execShellCommand");

const syncFolder = require("./sync-folder");

module.exports = async function (folder, repository) {
  console.log("Syncing git - Starting to synchronize with git remote:", repository.name);

  const gitRepositoryPath = path.join(folder, ".git");
  if (!fs.existsSync(gitRepositoryPath)) {
    console.log("Syncing git - Git repository doesn't exist, init it");
    await execShellCommand(`git init`, folder);
  }

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

  await syncFolder(folder, repository);
  setInterval(async () => {
    await syncFolder(folder, repository);
  }, repository.syncPeriodInMs || 10000);
};
