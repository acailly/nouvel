const fs = require("fs");
const path = require("path");
const configuration = require("../configuration");
const execShellCommand = require("./execShellCommand");

const syncFolder = require("./sync-folder");

module.exports = async function (repository) {  
  console.log("Starting to synchronize with git remote:", repository.name);
  
  const gitRepositoryPath = path.join(configuration.rootDataFolder, '.git')
  if (!fs.existsSync(gitRepositoryPath)) {
    console.log("Git repository doesn't exist, clone it");
    await execShellCommand(
      `git clone ${repository.remoteRepository} .`,
      configuration.rootDataFolder
    );
  }

  await syncFolder(configuration.rootDataFolder);
  setInterval(async () => {
    await syncFolder(configuration.rootDataFolder);
  }, repository.syncPeriodInMs || 10000);
};
