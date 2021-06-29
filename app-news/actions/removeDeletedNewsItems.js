const { listKeys, listSubFolders, remove } = require("../../@storage");

module.exports = async function (req, res) {
  const folder = "news/_deleted/items";

  const subfolders = await listSubFolders(folder);

  for (const subfolder of subfolders) {
    const subfolderFullPath = `${folder}/${subfolder}`;
    const itemKeys = await listKeys(subfolderFullPath);

    for (const itemKey of itemKeys) {
      await remove(`${subfolderFullPath}/${itemKey}`);
    }
  }

  res.redirect("back");
};
