const { getDatabase } = require("../@pouchdb");

module.exports = async function (key) {
  const db = getDatabase();

  await db.upsert(key, function (doc) {
    doc._deleted = true;
    return doc;
  });
};
