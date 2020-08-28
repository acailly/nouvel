const path = require("path");
const os = require("os");

// IDENTITY UUID
const identityFile = path.join(os.homedir(), ".zDemocracy", "identity.json");

// STORAGE FILE
const rootDataFolder = path.join(os.homedir(), ".zDemocracy", "data");

// APPLICATION EXPRESS
const applicationServerPort = 8080;

// SYNCHRONIZATION GIT

const gitSyncPeriodInMs = 20000;
const repositoriesToSync = [
  {
    name: "github",
    branch: "master",
    remoteRepository: "git@github.com:acailly/zDemocracy-lowtech-data.git",
    enablePush: true,
  },
  {
    name: "mobile",
    branch: "master",
    remoteRepository:
      "https://0e9c59c1-ce1a-4c49-9b39-b475adeb9032.serverless.social",
    enablePush: false,
  },
  {
    name: "desktop",
    branch: "master",
    remoteRepository:
      "https://a9f28f2e-bdbe-42b5-a451-7f855e7aa091.serverless.social",
    enablePush: false,
  },
];

// PUBLISH GIT DUMB HTTP
const gitDumbHttpPort = 8081;

// PUBLISH LOCALTUNNEL
const tunnellingHost = "http://serverless.social"; // See https://github.com/localtunnel/localtunnel/issues/343
const tunnellingLocalPort = 8081;

const configuration = {
  identityFile,
  rootDataFolder,
  applicationServerPort,
  gitSyncPeriodInMs,
  repositoriesToSync,
  gitDumbHttpPort,
  tunnellingHost,
  tunnellingLocalPort,
};

module.exports = configuration;
