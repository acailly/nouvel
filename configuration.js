const path = require("path");

// STORAGE FILE
const rootDataFolder = path.join(__dirname, "..", "zDemocracy-lowtech-data");
const pollsFolder = path.join(rootDataFolder, "polls");
const templatesFolder = path.join(rootDataFolder, "templates");

// APPLICATION EXPRESS
const applicationServerPort = 8080;

// SYNCHRONIZATION GIT
const foldersToSync = [rootDataFolder];
const syncPeriodInMs = 20000;

const configuration = {
  rootDataFolder,
  pollsFolder,
  templatesFolder,
  applicationServerPort,
  foldersToSync,
  syncPeriodInMs,
};

module.exports = configuration;
