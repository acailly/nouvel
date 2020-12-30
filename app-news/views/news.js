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

  const foldersNonEmpty = folders.filter((folder) => folder.count);

  const itemIds = await listKeys(currentFullPath);

  const items = await Promise.all(
    itemIds.map(async (itemId) => {
      const itemKey = `${currentFullPath}/${itemId}`;
      const itemContent = await read(itemKey);
      const itemDate = new Date(itemContent.timestamp);
      const formattedItemDate = `${itemDate.getDate()}/${
        itemDate.getMonth() + 1
      }/${itemDate.getFullYear()} ${itemDate.getHours()}:${itemDate.getMinutes()}`;

      return {
        ...itemContent,
        key: itemKey,
        date: formattedItemDate,
      };
    })
  );

  const itemsSortedByDateDesc = items.sort((a, b) => b.timestamp - a.timestamp);

  res.render("news.html", {
    items: itemsSortedByDateDesc,
    folders: foldersNonEmpty,
    currentPath,
    currentFullPath,
  });
};
