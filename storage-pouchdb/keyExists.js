const PouchDB = require("pouchdb");
const configuration = require("../@configuration");

module.exports = async function (key) {
  const db = new PouchDB(configuration.localDatabaseName);

  try {
    await db.get(key);
    return true;
  } catch (e) {
    if (e.status === 404) {
      return false;
    }
    throw e;
  }
};
