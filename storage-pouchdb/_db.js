const PouchDB = require("pouchdb");
const configuration = require("../@configuration");

// TODO ACY Tester si le prefix marche toujours dans le browser
const LocalPouchDB = PouchDB.defaults({
  prefix: `${configuration.localDatabaseFolder}/`,
});
LocalPouchDB.plugin(require("pouchdb-upsert"));

module.exports = function () {
  return new LocalPouchDB(configuration.localDatabaseName);
};
