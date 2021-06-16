const { getDatabase } = require("../@pouchdb");

module.exports = async function () {
  const db = getDatabase();

  const info = await db.info();
  return info;
};
