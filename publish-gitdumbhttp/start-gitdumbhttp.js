const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;

const express = require("express");

const configuration = require("../configuration");

module.exports = function () {
  // Create the hook if it doesn't exists
  const gitRepository = path.join(configuration.folderToSync, '.git');
  const hookFile = path.join(gitRepository, 'hooks', 'post-update');
  if (!fs.existsSync(hookFile)) {
    console.log("Post-update hook doesn't exist, create it");
    const hookFileSample = path.join(gitRepository, 'hooks', 'post-update.sample');
    fs.copyFileSync(hookFileSample, hookFile)

    // Update server info
    execSync('git update-server-info', {
      cwd: gitRepository
    });
  }

  const app = express();
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(path.join(configuration.rootDataFolder, ".git")));

  app.listen(configuration.gitDumbHttpPort);
};
