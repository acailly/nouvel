const getDatabase = require("./_db");

module.exports = async function (keyFolder) {
  const db = getDatabase();

  const keyFolderPrefix = keyFolder ? `${keyFolder}/` : "";

  const searchResults = await db.allDocs({
    startkey: `${keyFolderPrefix}`,
    endkey: `${keyFolderPrefix}\uffff`,
  });

  const subFolders = searchResults.rows
    .map((searchResult) => searchResult.id)
    .map((id) => id.slice(keyFolderPrefix.length))
    .filter((relativeId) => relativeId.indexOf("/") !== -1)
    .map((relativeId) => relativeId.split("/")[0])
    .reduce(
      (acc, current) => (acc.includes(current) ? acc : [...acc, current]),
      []
    );

  return subFolders;
};
