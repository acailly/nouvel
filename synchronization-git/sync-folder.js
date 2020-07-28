const execShellCommand = require("./execShellCommand")

async function syncFolder(folder) {
  console.log("Syncing git - Starting for", folder);
  console.log("Syncing git - Pull");
  const pullOutput = await execShellCommand("git pull", folder);

  console.log("Syncing git - Add");
  const addOutput = await execShellCommand("git add " + folder, folder);

  const checkOutput = await execShellCommand("git diff --name-only --cached", folder);
  if (checkOutput) {
    console.log("Syncing git - Commit");
    const commitOutput = await execShellCommand(
      'git commit -m ":white_check_mark: Automatic sync git"',
      folder
    );

    console.log("Syncing git - Push");
    const pushOutput = await execShellCommand("git push", folder);
  } else {
    console.log("Syncing git - No changes");
  }
  console.log("Syncing git - Finished");
}

module.exports = syncFolder;
