const path = require("path");
const fs = require("fs");
const makeDir = require("make-dir");
const configuration = require("../@configuration");
const { listKeys, read } = require("../@storage");
const { decrypt, isLocked } = require("../@secrets");
const loadGit = require("./loadGit");

module.exports = async function () {
  if (!configuration.syncEnabled) {
    console.log("[synchronization-git] Synchronization is disabled");
    return;
  }

  const git = await loadGit();

  const nextIteration = async () => {
    await sync(
      git,
      configuration.localStorageFolder,
      configuration.repositoriesStorageKey,
      configuration.localSubfoldersToSync
    );
    setTimeout(nextIteration, configuration.gitSyncPeriodInMs || 10000);
  };
  nextIteration();
};

async function sync(
  git,
  localStorageFolder,
  repositoriesStorageKey,
  localSubfoldersToSync
) {
  const repositoriesIds = await listKeys(repositoriesStorageKey);
  let repositoriesToSync = await Promise.all(
    repositoriesIds.map(async (repositoryId) => {
      const repositoryToSync = await read(
        `${repositoriesStorageKey}/${repositoryId}`
      );

      if (!isLocked()) {
        const encryptedPassword = repositoryToSync.password;
        const password = await decrypt(encryptedPassword);
        repositoryToSync.encryptedPassword = encryptedPassword;
        repositoryToSync.password = password;
      }

      return repositoryToSync;
    })
  );

  await prepareSync(
    git,
    localStorageFolder,
    localSubfoldersToSync,
    repositoriesToSync
  );

  await runSync(
    git,
    localStorageFolder,
    localSubfoldersToSync,
    repositoriesToSync
  );
}

async function prepareSync(
  git,
  localStorageFolder,
  localSubfoldersToSync,
  repositoriesToSync
) {
  await initializeGitRepositoryIfNecessary(git, localStorageFolder);

  for (
    let repositoryIndex = 0;
    repositoryIndex < repositoriesToSync.length;
    repositoryIndex++
  ) {
    const repository = repositoriesToSync[repositoryIndex];
    await registerRemoteRepositoryIfNecessary(
      git,
      localStorageFolder,
      repository
    );
  }

  for (const localSubfolder of localSubfoldersToSync) {
    const fullLocalSubfolderPath = path.join(
      localStorageFolder,
      localSubfolder
    );
    if (!fs.existsSync(fullLocalSubfolderPath)) {
      console.log(
        "[synchronization-git] Local subfolder doesn't exist, create it:",
        localSubfolder
      );
      await makeDir(fullLocalSubfolderPath);
    }
  }
}

async function initializeGitRepositoryIfNecessary(git, localStorageFolder) {
  // Check that the local storage folder exists

  if (!fs.existsSync(localStorageFolder)) {
    console.log(
      "[synchronization-git] Local storage folder doesn't exist, create it"
    );
    await makeDir(localStorageFolder);
  }

  // Check that the git repository exists

  const gitRepositoryPath = path.join(localStorageFolder, ".git");
  if (!fs.existsSync(gitRepositoryPath)) {
    console.log("[synchronization-git] Git repository doesn't exist, init it");
    await git.init(localStorageFolder);
  }
}

async function registerRemoteRepositoryIfNecessary(
  git,
  localStorageFolder,
  repository
) {
  const url = await git.getRemoteUrl(localStorageFolder, repository.name);
  if (!url) {
    console.log("[synchronization-git] register repository:", repository.name);
    await git.addRemote(
      localStorageFolder,
      repository.name,
      repository.remoteRepository
    );
  }
}

async function runSync(
  git,
  localStorageFolder,
  localSubfoldersToSync,
  repositories
) {
  console.log(
    "[synchronization-git] Starting to synchronize on git:",
    localStorageFolder
  );

  // Find reachable peers
  const reachableRepositories = [];
  for (
    let repositoryIndex = 0;
    repositoryIndex < repositories.length;
    repositoryIndex++
  ) {
    const repository = repositories[repositoryIndex];
    if (await canFetchRepository(git, localStorageFolder, repository)) {
      reachableRepositories.push(repository);
    }
  }

  // Pull changes from peers
  for (
    let repositoryIndex = 0;
    repositoryIndex < reachableRepositories.length;
    repositoryIndex++
  ) {
    const repository = reachableRepositories[repositoryIndex];
    await pullRemoteChanges(git, localStorageFolder, repository);
  }
  await updateServerInfo(git, localStorageFolder);

  // Push local changes
  await commitCurrentChanges(git, localStorageFolder, localSubfoldersToSync);
  for (
    let repositoryIndex = 0;
    repositoryIndex < reachableRepositories.length;
    repositoryIndex++
  ) {
    const repository = reachableRepositories[repositoryIndex];
    if (repository.enablePush) {
      await pushLocalChanges(git, localStorageFolder, repository);
    }
  }
  await updateServerInfo(git, localStorageFolder);

  const currentCommitOid = await git.getCurrentCommitOid(localStorageFolder);

  console.log(
    "[synchronization-git] Finished, currently at commit",
    currentCommitOid
  );
}

async function commitCurrentChanges(
  git,
  localStorageFolder,
  localSubfoldersToSync
) {
  for (const localSubfolder of localSubfoldersToSync) {
    console.log("[synchronization-git] Add subfolder:", localSubfolder);
    await git.add(localStorageFolder, localSubfolder);
  }

  const somethingToCommit = await git.somethingToCommit(localStorageFolder);
  if (somethingToCommit) {
    console.log("[synchronization-git] Commit");
    await git.commit(localStorageFolder);
  } else {
    console.log("[synchronization-git] No local changes");
  }
}

async function updateServerInfo(git, localStorageFolder) {
  console.log("[synchronization-git] Update server info");
  await git.updateServerInfo(localStorageFolder);
}

async function canFetchRepository(git, localStorageFolder, repository) {
  console.log("[synchronization-git] Can fetch", repository.name, "?");
  const canFetch = await git.canFetchRemote(
    localStorageFolder,
    repository.name,
    repository.remoteRepository,
    repository.branch,
    repository.login,
    repository.password
  );
  console.log("[synchronization-git]", canFetch ? "Yes" : "No");
  return canFetch;
}

async function pullRemoteChanges(git, localStorageFolder, repository) {
  console.log("[synchronization-git] Fetch repository:", repository.name);
  await git.fetch(localStorageFolder, repository.name, repository.branch);

  console.log("[synchronization-git] Merge repository:", repository.name);
  await git.merge(localStorageFolder, repository.name, repository.branch);
}

async function pushLocalChanges(git, localStorageFolder, repository) {
  console.log("[synchronization-git] Push to repository:", repository.name);
  await git.push(
    localStorageFolder,
    repository.name,
    repository.branch,
    repository.login,
    repository.password
  );
}
