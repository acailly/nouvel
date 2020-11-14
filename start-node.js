const path = require("path");
const configuration = require("./@configuration");

const { get: getIdentity } = require("./@identity");
const identity = getIdentity();
console.log(`Connected as ${identity.id}`);

// const startZDemocracyExpress = require("./app-zdemocracy/start-zdemocracy-express");
// startZDemocracyExpress();

const appListPath = path.join(__dirname, "app-list");
const appConfig = require("./app-list/app-config");
const createNodeApp = require("./distrib-node/create-app");
createNodeApp(appListPath, appConfig, configuration.listServerPort);

// const startPublishingGitDumbHttp = require("./expose-gitdumbhttp/start-gitdumbhttp");
// startPublishingGitDumbHttp();

// const startPublishingLocaltunnel = require("./expose-localtunnel/start-localtunnel");
// startPublishingLocaltunnel();

const startSynchronizationGit = require("./synchronization-git/start-synchronization-git");
const createApp = require("./distrib-browser/create-app");
startSynchronizationGit();
