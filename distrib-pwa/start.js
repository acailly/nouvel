const createBrowserApp = require("./create-app");
createBrowserApp();

const startSynchronizationPouchDB = require("../synchronization-pouchdb/start-synchronization-pouchdb");
startSynchronizationPouchDB();
