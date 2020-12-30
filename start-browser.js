//==== START THE APP ====

const createBrowserApp = require("./distrib-browser/create-app");
// const appListConfig = require("./app-list/app-config");
// createBrowserApp(appListConfig);
const appNewsConfig = require("./app-news/app-config");
createBrowserApp(appNewsConfig);
