const { getDatabase } = require("../@pouchdb");

module.exports = async function (keyFolder) {
  const t0 = new Date().getTime();

  const db = getDatabase();

  const keyFolderPrefix = keyFolder ? `${keyFolder}/` : "";

  const searchResults = await db.allDocs({
    startkey: `${keyFolderPrefix}`,
    endkey: `${keyFolderPrefix}\uffff`,
  });

  const t1 = new Date().getTime();

  const keys = searchResults.rows
    .map((searchResult) => searchResult.id)
    .map((id) => id.slice(keyFolderPrefix.length))
    .filter((relativeId) => relativeId.indexOf("/") === -1);

  const t2 = new Date().getTime();

  console.log("t1", t1 - t0);
  console.log("t2", t2 - t1);

  return keys;
};
