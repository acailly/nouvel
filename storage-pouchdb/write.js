const getDatabase = require("./_db");

module.exports = async function (key, value) {
  const db = getDatabase();

  await db.upsert(key, function (doc) {
    return value;
  });
};
