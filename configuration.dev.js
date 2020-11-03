const path = require("path");
const os = require("os");

// IDENTITY UUID
const identityFile = path.join(os.homedir(), ".zDemocracy", "identity.json");

// SECRETS PLAINTEXT
const secretsFile = path.join(os.homedir(), ".zDemocracy", "secrets.json");

// STORAGE FILE
const localStorageFolder = path.join(os.homedir(), ".zDemocracy", "data");

// APP ZDEMOCRACY
const zdemocracyServerPort = 8080;

// APP LIST
const listServerPort = 8082;

// SYNCHRONIZATION GIT

const syncEnabled = true;
const useNativeGit = true;
const gitSyncPeriodInMs = 20000;
const localSubfoldersToSync = ["lists"];
const repositoriesStorageKey = "repositories";
// const repositoriesToSync = [
//   {
//     name: "github",
//     branch: "master",
//     // remoteRepository: "git@github.com:acailly/zDemocracy-lowtech-data.git",
//     remoteRepository: "https://github.com/acailly/zDemocracy-lowtech-data.git",
//     enablePush: true,
//   },
//   {
//     name: "desktop",
//     branch: "master",
//     remoteRepository:
//       "https://a9f28f2e-bdbe-42b5-a451-7f855e7aa091.serverless.social",
//     enablePush: false,
//   },
//   {
//     name: "mobile",
//     branch: "master",
//     remoteRepository:
//       "https://0e9c59c1-ce1a-4c49-9b39-b475adeb9032.serverless.social",
//     enablePush: false,
//   },
// ];

// PUBLISH GIT DUMB HTTP
const gitDumbHttpPort = 8081;

// PUBLISH LOCALTUNNEL
// See https://github.com/localtunnel/localtunnel/issues/343
// See https://github.com/localtunnel/localtunnel/issues/352#issuecomment-707417061
const tunnellingHost = "http://localtunnel.me";
const tunnellingLocalPort = 8081;

const configuration = {
  identityFile,
  secretsFile,
  localStorageFolder,
  zdemocracyServerPort,
  listServerPort,
  syncEnabled,
  useNativeGit,
  gitSyncPeriodInMs,
  localSubfoldersToSync,
  repositoriesStorageKey,
  gitDumbHttpPort,
  tunnellingHost,
  tunnellingLocalPort,
};

module.exports = configuration;