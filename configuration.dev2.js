const path = require("path");
const os = require("os");

// IDENTITY UUID
const identityFile = path.join(os.homedir(), ".zDemocracy2", "identity.json");

// SECRETS PLAINTEXT
const secretsFile = path.join(os.homedir(), ".zDemocracy2", "secrets.json");

// STORAGE FILE
const localStorageFolder = path.join(os.homedir(), ".zDemocracy2", "data");

// APP ZDEMOCRACY
const zdemocracyServerPort = 8080;

// APP LIST
const listServerPort = 8083;

// APP NEWS
const newsServerPort = 8093;

// SYNCHRONIZATION GIT
const syncEnabled = true;
const useNativeGit = false;
const gitSyncPeriodInMs = 20000;
const localSubfoldersToSync = ["lists"];
const repositoriesStorageKey = "repositories";

// PUBLISH GIT DUMB HTTP
const gitDumbHttpPort = 8081;

// PUBLISH LOCALTUNNEL
// See https://github.com/localtunnel/localtunnel/issues/343
// See https://github.com/localtunnel/localtunnel/issues/352#issuecomment-707417061
const tunnellingHost = "http://localtunnel.me";
const tunnellingLocalPort = 8081;

// DISTRIB BROWSER
const deployBaseURL = "/zDemocracy-lowtech";

const configuration = {
  identityFile,
  secretsFile,
  localStorageFolder,
  zdemocracyServerPort,
  listServerPort,
  newsServerPort,
  syncEnabled,
  useNativeGit,
  gitSyncPeriodInMs,
  localSubfoldersToSync,
  repositoriesStorageKey,
  gitDumbHttpPort,
  tunnellingHost,
  tunnellingLocalPort,
  deployBaseURL,
};

module.exports = configuration;

// TO NOT FORGET: examples of git repositories

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
