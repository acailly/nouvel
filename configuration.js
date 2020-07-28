const path = require("path");
const os = require('os');

// IDENTITY UUID
const identityFile = path.join(os.homedir(), ".zDemocracy", "identity.json");

// STORAGE FILE
const rootDataFolder = path.join(os.homedir(), ".zDemocracy", "data");

// APPLICATION EXPRESS
const applicationServerPort = 8080;

// SYNCHRONIZATION GIT
const folderToSync = rootDataFolder;
const remoteRepository = 'git@github.com:acailly/zDemocracy-lowtech-data.git';
const syncPeriodInMs = 20000;

// PUBLISH LOCALTUNNEL
const tunnellingHost = "http://serverless.social"; // See https://github.com/localtunnel/localtunnel/issues/343
const tunnellingSubDomain = "zdemocracy";

const configuration = {
  identityFile,
  rootDataFolder,
  applicationServerPort,
  folderToSync,
  remoteRepository,
  syncPeriodInMs,
  tunnellingHost,
  tunnellingSubDomain,
};

module.exports = configuration;
