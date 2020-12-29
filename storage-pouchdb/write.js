const PouchDB = require("pouchdb");
const configuration = require("../@configuration");

module.exports = async function (key, value) {
  const db = new PouchDB(configuration.localDatabaseName);
  PouchDB.plugin(require("pouchdb-upsert"));

  await db.upsert(key, function (doc) {
    return value;
  });
};
