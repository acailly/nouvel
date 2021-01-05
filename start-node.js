const { get: getIdentity } = require("./@identity");
getIdentity().then((identity) => {
  console.log(`Connected as ${identity.id}`);
});

// const startZDemocracyExpress = require("./app-zdemocracy/start-zdemocracy-express");
// startZDemocracyExpress();

const createNodeApp = require("./distrib-node/create-app");
createNodeApp();

// const startPublishingGitDumbHttp = require("./expose-gitdumbhttp/start-gitdumbhttp");
// startPublishingGitDumbHttp();

// const startPublishingLocaltunnel = require("./expose-localtunnel/start-localtunnel");
// startPublishingLocaltunnel();

// const startSynchronizationGit = require("./synchronization-git/start-synchronization-git");
// startSynchronizationGit();

const startPublishingPouchDBServer = require("./expose-pouchdbserver/start-pouchdbserver");
startPublishingPouchDBServer();

const startSynchronizationPouchDB = require("./synchronization-pouchdb/start-synchronization-pouchdb");
startSynchronizationPouchDB();
