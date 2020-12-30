const { getDatabase } = require("../@pouchdb");

module.exports = async function (key) {
  const db = getDatabase();

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
