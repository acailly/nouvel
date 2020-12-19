const { read, write, remove } = require("../../@storage");

module.exports = async function (req, res) {
  const itemKey = req.body.key;

  const itemContent = await read(itemKey);

  const deletedItemKey = itemKey.replace("news/", "news/_deleted/");
  await write(deletedItemKey, itemContent);

  const deletedFlagItemKey = itemKey.replace("news/", "news/_deleted_flag/");
  await write(deletedFlagItemKey, {});

  await remove(itemKey);

  res.redirect("back");
};
