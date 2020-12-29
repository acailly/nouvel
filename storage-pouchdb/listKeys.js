const PouchDB = require("pouchdb");
const configuration = require("../@configuration");

module.exports = async function (keyFolder) {
  const db = new PouchDB(configuration.localDatabaseName);

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
