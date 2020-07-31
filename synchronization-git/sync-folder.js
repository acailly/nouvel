const execShellCommand = require("./execShellCommand")

async function syncFolder(folder, repository) {
  // Commit local changes

  console.log("Syncing git - Add");
  const addOutput = await execShellCommand("git add " + folder, folder);

  const checkOutput = await execShellCommand("git diff --name-only --cached", folder);
  if (checkOutput) {
    console.log("Syncing git - Commit");
    const commitOutput = await execShellCommand(
      'git commit -m ":white_check_mark: Automatic sync git"',
      folder
    );
  } else {
    console.log("Syncing git - No local changes");
  }
  
  // Merge distant changes
  
  console.log("Syncing git - Fetch");
  const fetchOutput = await execShellCommand(
    `git fetch ${repository.name} ${repository.branch}`, 
    folder
  );

  console.log("Syncing git - Merge");
  const mergeOutput = await execShellCommand(
    `git merge ${repository.name}/${repository.branch}`, 
    folder
  );

  // Push changes to distant

  console.log("Syncing git - Push");
  const pushOutput = await execShellCommand(
    `git push ${repository.name} ${repository.branch}`, 
    folder
  );
  
  console.log("Syncing git - Finished");
}

module.exports = syncFolder;
