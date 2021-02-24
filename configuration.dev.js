const path = require("path");
const os = require("os");

const homeDirectory = path.join(os.homedir(), ".nouvel");

// IDENTITY UUID
const identityKey = "_local/identity";

// STORAGE FILE
const localStorageFolder = path.join(homeDirectory, "data");

// STORAGE POUCHDB
const localDatabaseName = "storage";
const localDatabaseFolder = path.join(homeDirectory, "db");

// SYNCHRONIZATION POUCHDB
const syncPouchDBEnabled = true;
const remoteListKey = "_local/remotes";
const pouchdbSyncPeriodInMs = 20000;
const synchronizationStatusKey = "_local/sync_status_pouchdb";

// EXPOSE POUCHDB SERVER
const pouchdbServerPort = 5984;

// EXPOSE LOCALTUNNEL
// See https://github.com/localtunnel/localtunnel/issues/343
// See https://github.com/localtunnel/localtunnel/issues/352#issuecomment-707417061
const tunnellingHost = "http://localtunnel.me";
const tunnellingLocalPort = 8081;

// DISTRIB NODE
const nodeServerPort = 8092;

// DISTRIB BROWSER
const deployBaseURL = "/nouvel";
const corsProxyURL = "https://acailly-cors-anywhere.herokuapp.com/";
const serviceWorkerVersion = "v1-alpha04";

// DISTRIB CAPACITOR
const capacitorBaseURL = "";

const configuration = {
  identityKey,
  localStorageFolder,
  localDatabaseName,
  localDatabaseFolder,
  nodeServerPort,
  distrib: {
    pouchdb: {
      syncPouchDBEnabled,
      remoteListKey,
      pouchdbSyncPeriodInMs,
      synchronizationStatusKey,
    },
  },
  pouchdbServerPort,
  tunnellingHost,
  tunnellingLocalPort,
  deployBaseURL,
  corsProxyURL,
  serviceWorkerVersion,
  capacitorBaseURL,
};

module.exports = configuration;
