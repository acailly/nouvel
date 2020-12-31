const { listKeys, listSubFolders, read } = require("../../@storage");

module.exports = async function (req, res) {
  const rootPath = ``;
  const currentPath = req.query.path || "";
  let currentFullPath = rootPath + currentPath;
  if (currentFullPath.startsWith("/")) {
    currentFullPath = currentFullPath.slice(1);
  }

  const folderNames = await listSubFolders(currentFullPath);
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

  const itemIds = await listKeys(currentFullPath);

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

  res.render("dev.html", {
    items,
    folders,
    currentPath,
    currentFullPath,
  });
};
