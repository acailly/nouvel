const { listKeys, listSubFolders, read } = require("../../@storage");

module.exports = async function (req, res) {
  const rootPath = `news/items`;
  const currentPath = req.query.path || "";
  const currentFullPath = rootPath + currentPath;

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
      return await read(`${currentFullPath}/${itemId}`);
    })
  );

  res.render("news.html", { items, folders, currentPath });
};
