const path = require("path");
const configuration = require("./@configuration");

const { get: getIdentity } = require("./@identity");
const identity = getIdentity();
console.log(`Connected as ${identity.id}`);

// const startZDemocracyExpress = require("./app-zdemocracy/start-zdemocracy-express");
// startZDemocracyExpress();

const createNodeApp = require("./distrib-node/create-app");
// const appListPath = path.join(__dirname, "app-list");
// const appListConfig = require("./app-list/app-config");
// const createNodeApp = require("./distrib-node/create-app");
// createNodeApp(appListPath, appListConfig, configuration.listServerPort);
const appNewsPath = path.join(__dirname, "app-news");
const appNewsConfig = require("./app-news/app-config");
createNodeApp(appNewsPath, appNewsConfig, configuration.newsServerPort);

// const startPublishingGitDumbHttp = require("./expose-gitdumbhttp/start-gitdumbhttp");
// startPublishingGitDumbHttp();

// const startPublishingLocaltunnel = require("./expose-localtunnel/start-localtunnel");
// startPublishingLocaltunnel();

const startSynchronizationGit = require("./synchronization-git/start-synchronization-git");
startSynchronizationGit();
