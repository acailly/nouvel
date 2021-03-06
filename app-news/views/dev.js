const configuration = require("../../@configuration");
const {
  listKeys,
  listSubFolders,
  read,
  getStorageInfo,
} = require("../../@storage");

module.exports = async function (req, res) {
  const tStart = new Date().getTime();

  const rootPath = ``;
  const currentPath = req.query.path || "";
  let currentFullPath = rootPath + currentPath;
  if (currentFullPath.startsWith("/")) {
    currentFullPath = currentFullPath.slice(1);
  }

  const folderNames = await listSubFolders(currentFullPath);

  const tListSubfolder = new Date().getTime();
  const timeListSubfolders = tListSubfolder - tStart;

  const folders = await Promise.all(
    folderNames.map(async (folderName) => {
      const folderKeys = await listKeys(currentFullPath + "/" + folderName);
      const folderCount = folderKeys.length;
      return {
        name: folderName,
        count: folderCount,
      };
    })
  );

  const tCountSubfolderItems = new Date().getTime();
  const timeCountSubfoldersItems = tCountSubfolderItems - tListSubfolder;

  const itemIds = await listKeys(currentFullPath);

  const tListKeys = new Date().getTime();
  const timeListItems = tListKeys - tCountSubfolderItems;

  const items = await Promise.all(
    itemIds.map(async (itemId) => {
      const itemFullKey = `${currentFullPath}/${itemId}`;
      const itemContent = await read(itemFullKey);

      return {
        content: itemContent,
        key: itemId,
        fullKey: itemFullKey,
      };
    })
  );

  const tReadAllItems = new Date().getTime();
  const timeReadItems = tReadAllItems - tListKeys;

  const storageInfo = await getStorageInfo();

  const tStorageInfo = new Date().getTime();
  const timeStorageInfo = tStorageInfo - tReadAllItems;

  const timePage = tStorageInfo - tStart;

  res.render("dev.html", {
    items,
    folders,
    currentPath,
    currentFullPath,
    applicationVersion: configuration.applicationVersion,
    timePage,
    timeListSubfolders,
    timeCountSubfoldersItems,
    timeListItems,
    timeReadItems,
    timeStorageInfo,
    storageInfo,
  });
};
