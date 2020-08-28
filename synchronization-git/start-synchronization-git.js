const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const configuration = require("../configuration");
const execShellCommand = require("./execShellCommand");

module.exports = async function () {
  await initializeGitRepositoryIfNecessary(configuration.rootDataFolder);

  for (
    let repositoryIndex = 0;
    repositoryIndex < configuration.repositoriesToSync.length;
    repositoryIndex++
  ) {
    const repository = configuration.repositoriesToSync[repositoryIndex];
    await registerRemoteRepositoryIfNecessary(
      configuration.rootDataFolder,
      repository
    );
  }

  await sync(configuration.rootDataFolder, configuration.repositoriesToSync);
  setInterval(async () => {
    await sync(configuration.rootDataFolder, configuration.repositoriesToSync);
  }, configuration.gitSyncPeriodInMs || 10000);
};

async function initializeGitRepositoryIfNecessary(folder) {
  // Check that the data folder exists

  if (!fs.existsSync(folder)) {
    console.log("Syncing git - Storage folder doesn't exist, create it");
    mkdirp.sync(folder);
  }

  // Check that the git repository exists

  const gitRepositoryPath = path.join(folder, ".git");
  if (!fs.existsSync(gitRepositoryPath)) {
    console.log("Syncing git - Git repository doesn't exist, init it");
    await execShellCommand(`git init`, folder);
  }
}

async function registerRemoteRepositoryIfNecessary(folder, repository) {
  try {
    await execShellCommand(`git remote get-url ${repository.name}`, folder);
  } catch (e) {
    console.log("Syncing git - Remote repository doesn't exist, add it");
    await execShellCommand(
      `git remote add ${repository.name} ${repository.remoteRepository}`,
      folder
    );
  }
}

async function sync(folder, repositories) {
  console.log("Syncing git - Starting to synchronize on git:", folder);

  await commitCurrentChanges(folder);

  for (
    let repositoryIndex = 0;
    repositoryIndex < repositories.length;
    repositoryIndex++
  ) {
    const repository = repositories[repositoryIndex];

    if (!(await canFetchRepository(folder, repository))) {
      console.log("No, cannot fetch", folder);
      return;
    }

    await pullRemoteChanges(folder, repository);
    if (repository.enablePush) {
      await pushLocalChanges(folder, repository);
    }
  }

  console.log("Syncing git - Finished");
}

async function commitCurrentChanges(folder) {
  console.log("Syncing git - Add");
  const addOutput = await execShellCommand("git add " + folder, folder);

  const checkOutput = await execShellCommand(
    "git diff --name-only --cached",
    folder
  );
  if (checkOutput) {
    console.log("Syncing git - Commit");
    const commitOutput = await execShellCommand(
      'git commit -m ":white_check_mark: Automatic sync git"',
      folder
    );
  } else {
    console.log("Syncing git - No local changes");
  }
}

async function canFetchRepository(folder, repository) {
  console.log("Syncing git - Can fetch?");

  let canFetch = true;

  try {
    // https://superuser.com/a/833286
    const canFetchOutput = await execShellCommand(
      `git ls-remote --exit-code -h "${repository.remoteRepository}"`,
      folder
    );
  } catch (e) {
    canFetch = false;
  }

  return canFetch;
}

async function pullRemoteChanges(folder, repository) {
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
}

async function pushLocalChanges(folder, repository) {
  console.log("Syncing git - Push");
  const pushOutput = await execShellCommand(
    `git push ${repository.name} ${repository.branch}`,
    folder
  );
}
