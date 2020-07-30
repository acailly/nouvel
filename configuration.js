const path = require("path");
const os = require('os');

// IDENTITY UUID
const identityFile = path.join(os.homedir(), ".zDemocracy", "identity.json");

// STORAGE FILE
const rootDataFolder = path.join(os.homedir(), ".zDemocracy", "data");

// APPLICATION EXPRESS
const applicationServerPort = 8080;

// SYNCHRONIZATION GIT

const repositoriesToSync = [
  {
    name: "github",
    remoteRepository: 'git@github.com:acailly/zDemocracy-lowtech-data.git',
    syncPeriodInMs: 20000,
    enablePush: true
  }
]

// PUBLISH GIT DUMB HTTP
const gitDumbHttpPort = 8081;

// PUBLISH LOCALTUNNEL
const tunnellingHost = "http://serverless.social"; // See https://github.com/localtunnel/localtunnel/issues/343
const tunnellingLocalPort = 8081;

const configuration = {
  identityFile,
  rootDataFolder,
  applicationServerPort,
  repositoriesToSync,
  gitDumbHttpPort,
  tunnellingHost,
  tunnellingLocalPort
};

module.exports = configuration;
