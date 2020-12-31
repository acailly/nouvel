const { getDatabase } = require("../@pouchdb");

module.exports = async function (keyFolder) {
  const db = getDatabase();

  const keyFolderPrefix = keyFolder ? `${keyFolder}/` : "";

  const searchResults = await db.allDocs({
    startkey: `${keyFolderPrefix}`,
    // see https://github.com/pouchdb/pouchdb/issues/6456#issuecomment-753092061
    endkey: `${keyFolderPrefix}\u{10ffff}`,
  });

  const subFolders = searchResults.rows
    .map((searchResult) => searchResult.id)
    .map((id) => id.slice(keyFolderPrefix.length))
    .filter((relativeId) => relativeId.indexOf("/") !== -1)
    .map((relativeId) => relativeId.split("/")[0])
    .reduce((acc, current) => {
      return acc.includes(current) ? acc : [...acc, current];
    }, []);

  return subFolders;
};
