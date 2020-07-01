const syncFolder = require("./sync-folder")

async function syncFolders(folders) {
  for (
    let folderIndex = 0;
    folderIndex < folders.length;
    folderIndex++
  ) {
    const folder = folders[folderIndex];
    await syncFolder(folder);
  }
}

module.exports = syncFolders;
