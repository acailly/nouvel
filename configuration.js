const path = require("path");

// STORAGE FILE
const rootDataFolder = path.join(__dirname, "..", "zDemocracy-lowtech-data");

// APPLICATION EXPRESS
const applicationServerPort = 8080;

// SYNCHRONIZATION GIT
const foldersToSync = [rootDataFolder];
const syncPeriodInMs = 20000;

// PUBLISH LOCALTUNNEL

const tunnellingHost = "http://serverless.social"; // See https://github.com/localtunnel/localtunnel/issues/343
const tunnellingSubDomain = "zdemocracy";

const configuration = {
  rootDataFolder,
  applicationServerPort,
  foldersToSync,
  syncPeriodInMs,
  tunnellingHost,
  tunnellingSubDomain,
};

module.exports = configuration;
