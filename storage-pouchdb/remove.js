const PouchDB = require("pouchdb");
const configuration = require("../@configuration");

module.exports = async function (key) {
  const db = new PouchDB(configuration.localDatabaseName);
  PouchDB.plugin(require("pouchdb-upsert"));

  await db.upsert(key, function (doc) {
    doc._deleted = true;
    return doc;
  });
};
