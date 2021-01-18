const { get: getIdentity } = require("./@identity");
getIdentity().then((identity) => {
  console.log(`Connected as ${identity.id}`);
});

const createNodeApp = require("./distrib-node/create-app");
createNodeApp();

const startPublishingPouchDBServer = require("./expose-pouchdbserver/start-pouchdbserver");
startPublishingPouchDBServer();

const startSynchronizationPouchDB = require("./synchronization-pouchdb/start-synchronization-pouchdb");
startSynchronizationPouchDB();

// const startPublishingLocaltunnel = require("./expose-localtunnel/start-localtunnel");
// startPublishingLocaltunnel();
