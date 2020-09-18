const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const configuration = require("../configuration");
const execShellCommand = require("./execShellCommand");
const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')

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
    await git.init({fs, dir: folder })
    // await execShellCommand(`git init`, folder);
  }
}

async function registerRemoteRepositoryIfNecessary(folder, repository) {
  const url = await git.getConfig({fs, dir: folder, path: `remote.${repository.name}.url`})
  //await execShellCommand(`git remote get-url ${repository.name}`, folder);
  if(!url){
    console.log("Syncing git - Remote repository doesn't exist, add it");
    await git.addRemote({
      fs,
      dir: folder,
      remote: repository.name,
      url: repository.remoteRepository
    })
    // await execShellCommand(
    //   `git remote add ${repository.name} ${repository.remoteRepository}`,
    //   folder
    // );
  }
}

async function sync(folder, repositories) {
  console.log("Syncing git - Starting to synchronize on git:", folder);

  await commitCurrentChanges(folder);

  await updateServerInfo(folder);

  for (
    let repositoryIndex = 0;
    repositoryIndex < repositories.length;
    repositoryIndex++
  ) {
    const repository = repositories[repositoryIndex];

    if (!(await canFetchRepository(folder, repository))) {
      continue;
    }

    await pullRemoteChanges(folder, repository);
    if (repository.enablePush) {
      await pushLocalChanges(folder, repository);
    }
  }

  await updateServerInfo(folder);

  console.log("Syncing git - Finished");
}

async function commitCurrentChanges(folder) {
  console.log("Syncing git - Add");
  // const addOutput = await execShellCommand("git add " + folder, folder);
  await git.add({ fs, dir: folder, filepath: "." })

  // const checkOutput = await execShellCommand(
  //   "git diff --name-only --cached",
  //   folder
  // );
  const indexedFiles = await git.listFiles({ fs, dir: folder })
  if (indexedFiles && indexedFiles.length) {
    console.log("Syncing git - Commit");
    // const commitOutput = await execShellCommand(
    //   'git commit -m ":white_check_mark: Automatic sync git"',
    //   folder
    // );
    await git.commit({
      fs,
      dir: folder,
      message: ':white_check_mark: Automatic sync git',
      author: { // TODO ACY
        name: 'Mr. Test',
        email: 'mrtest@example.com',
      },
    })
  } else {
    console.log("Syncing git - No local changes");
  }
}

async function updateServerInfo(folder) {
  console.log("Syncing git - Update server info");
  const updateServerInfoOutput = await execShellCommand(
    "git update-server-info",
    folder
  );
}

async function canFetchRepository(folder, repository) {
  console.log("Syncing git - Can fetch", repository.name, "?");

  let canFetch = true;

  try {
    // // https://superuser.com/a/833286
    // const canFetchOutput = await execShellCommand(
    //   `git ls-remote --exit-code -h "${repository.remoteRepository}"`,
    //   folder
    // );
    await git.fetch({
      fs,
      http,
      dir: folder,
      corsProxy: 'https://cors.isomorphic-git.org',
      remote: repository.name,
      remoteRef: repository.branch,
      onAuth(url) {
        return {username: 'acailly', password: 'XXXX'}; // TODO ACY
      },
      depth: 1,
      singleBranch: true,
      tags: false,
    })
  } catch (e) {
    console.log("Syncing git - No, cannot fetch", repository.name);
    console.log("DEBUG", e);
    canFetch = false;
  }

  return canFetch;
}

async function pullRemoteChanges(folder, repository) {
  console.log("Syncing git - Fetch");
  // const fetchOutput = await execShellCommand(
  //   `git fetch ${repository.name} ${repository.branch}`,
  //   folder
  // );
  await git.fetch({
    fs,
    http,
    dir: folder,
    corsProxy: 'https://cors.isomorphic-git.org',
    remote: repository.name,
    remoteRef: repository.branch
  })

  console.log("Syncing git - Merge");
  // const mergeOutput = await execShellCommand(
  //   `git merge ${repository.name}/${repository.branch}`,
  //   folder
  // );
  await git.merge({
    fs,
    dir: folder,
    theirs: `remotes/${repository.name}/${repository.branch}`,
    author: { // TODO ACY
      name: 'Mr. Test',
      email: 'mrtest@example.com',
    },
  })
}

async function pushLocalChanges(folder, repository) {
  console.log("Syncing git - Push");
  // const pushOutput = await execShellCommand(
  //   `git push ${repository.name} ${repository.branch}`,
  //   folder
  // );
  await git.push({
    fs,
    http,
    dir: folder,
    remote: repository.name,
    ref: repository.branch,
    onAuth(url) {
      return {username: 'acailly', password: 'XXXX'}; // TODO ACY
    },
  })
}
