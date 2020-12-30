const { listKeys } = require("../../@storage");
const removeNewsItem = require("../domain/removeNewsItem");

module.exports = async function (req, res) {
  const folder = req.body.folder;

  const itemKeys = await listKeys(folder);

  for (const itemKey of itemKeys) {
    await removeNewsItem(`${folder}/${itemKey}`);
  }

  res.redirect("back");
};
