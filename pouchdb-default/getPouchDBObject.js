const PouchDB = require("pouchdb");
const makeDir = require("make-dir");
const fs = require("fs");
const configuration = require("../@configuration");

// TODO ACY Tester si ca marche dans le browser
if (!fs.existsSync(configuration.localDatabaseFolder)) {
  makeDir.sync(configuration.localDatabaseFolder);
}
// TODO ACY Tester si le prefix marche toujours dans le browser
const LocalPouchDB = PouchDB.defaults({
  prefix: `${configuration.localDatabaseFolder}/`,
});
LocalPouchDB.plugin(require("pouchdb-upsert"));

module.exports = function () {
  return LocalPouchDB;
};
