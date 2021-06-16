const { getDatabase } = require("../@pouchdb");

module.exports = async function (keyFolder) {
  const db = getDatabase();

  const keyFolderPrefix = keyFolder ? `${keyFolder}/` : "";

  const searchResults = await db.allDocs({
    startkey: `${keyFolderPrefix}`,
    endkey: `${keyFolderPrefix}\uffff`,
  });

  const keys = searchResults.rows
    .map((searchResult) => searchResult.id)
    .map((id) => id.slice(keyFolderPrefix.length))
    .filter((relativeId) => relativeId.indexOf("/") === -1);

  return keys;
};
