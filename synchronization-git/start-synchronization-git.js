const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const configuration = require("../@configuration");
const loadGit = require("./loadGit");

module.exports = async function () {
  const git = await loadGit();
  await initializeGitRepositoryIfNecessary(git, configuration.rootDataFolder);

  for (
    let repositoryIndex = 0;
    repositoryIndex < configuration.repositoriesToSync.length;
    repositoryIndex++
  ) {
    const repository = configuration.repositoriesToSync[repositoryIndex];
    await registerRemoteRepositoryIfNecessary(
      git,
      configuration.rootDataFolder,
      repository
    );
  }

  await sync(
    git,
    configuration.rootDataFolder,
    configuration.repositoriesToSync
  );
  setInterval(async () => {
    await sync(
      git,
      configuration.rootDataFolder,
      configuration.repositoriesToSync
    );
  }, configuration.gitSyncPeriodInMs || 10000);
};

async function initializeGitRepositoryIfNecessary(git, folder) {
  // Check that the data folder exists

  if (!fs.existsSync(folder)) {
    console.log("Syncing git - Storage folder doesn't exist, create it");
    mkdirp.sync(folder);
  }

  // Check that the git repository exists

  const gitRepositoryPath = path.join(folder, ".git");
  if (!fs.existsSync(gitRepositoryPath)) {
    console.log("Syncing git - Git repository doesn't exist, init it");
    await git.init(folder);
  }
}

async function registerRemoteRepositoryIfNecessary(git, folder, repository) {
  const url = await git.getRemoteUrl(folder, repository.name);
  if (!url) {
    console.log("Syncing git - Remote repository doesn't exist, add it");
    await git.addRemote(folder, repository.name, repository.remoteRepository);
  }
}

async function sync(git, folder, repositories) {
  console.log("Syncing git - Starting to synchronize on git:", folder);

  await commitCurrentChanges(git, folder);

  await updateServerInfo(git, folder);

  for (
    let repositoryIndex = 0;
    repositoryIndex < repositories.length;
    repositoryIndex++
  ) {
    const repository = repositories[repositoryIndex];

    if (!(await canFetchRepository(git, folder, repository))) {
      continue;
    }

    await pullRemoteChanges(git, folder, repository);
    if (repository.enablePush) {
      await pushLocalChanges(git, folder, repository);
    }
  }

  await updateServerInfo(git, folder);

  console.log("Syncing git - Finished");
}

async function commitCurrentChanges(git, folder) {
  console.log("Syncing git - Add");
  await git.add(folder, ".");

  const somethingToCommit = await git.somethingToCommit(folder);
  if (somethingToCommit) {
    console.log("Syncing git - Commit");
    await git.commit(folder);
  } else {
    console.log("Syncing git - No local changes");
  }
}

async function updateServerInfo(git, folder) {
  console.log("Syncing git - Update server info");
  await git.updateServerInfo(folder);
}

async function canFetchRepository(git, folder, repository) {
  console.log("Syncing git - Can fetch", repository.name, "?");
  const canFetch = await git.canFetchRemote(
    folder,
    repository.name,
    repository.remoteRepository,
    repository.branch
  );
  return canFetch;
}

async function pullRemoteChanges(git, folder, repository) {
  console.log("Syncing git - Fetch");
  await git.fetch(folder, repository.name, repository.branch);

  console.log("Syncing git - Merge");
  await git.merge(folder, repository.name, repository.branch);
}

async function pushLocalChanges(git, folder, repository) {
  console.log("Syncing git - Push");
  await git.push(folder, repository.name, repository.branch);
}
