const { getDatabase } = require("../@pouchdb");

module.exports = async function (key) {
  const db = getDatabase();

  try {
    const doc = await db.get(key);
    const { _id, _rev, ...value } = doc;
    return value;
  } catch (e) {
    if (e.status === 404) {
      return null;
    }
    throw e;
  }
};
