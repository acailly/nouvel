const getDatabase = require("./_db");

module.exports = async function (key) {
  const db = getDatabase();

  await db.upsert(key, function (doc) {
    doc._deleted = true;
    return doc;
  });
};
