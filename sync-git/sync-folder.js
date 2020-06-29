const exec = require("child_process").exec;

// From https://medium.com/@ali.dev/how-to-use-promise-with-exec-in-node-js-a39c4d7bbf77
function execShellCommand(cmd, cwd) {
  return new Promise((resolve, reject) => {
    exec(
      cmd,
      {
        cwd
      },
      (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

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
