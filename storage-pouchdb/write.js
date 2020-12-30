const { getDatabase } = require("../@pouchdb");

module.exports = async function (key, value) {
  const db = getDatabase();

  await db.upsert(key, function (doc) {
    return value;
  });
};
