const { read, write, remove } = require("../../@storage");
const deletedPathFromPath = require("../rules/deletedPathFromPath");
const deletedFlagPathFromPath = require("../rules/deletedFlagPathFromPath");

module.exports = async function (req, res) {
  const itemKey = req.body.key;

  const itemContent = await read(itemKey);

  const deletedItemKey = deletedPathFromPath(itemKey);
  await write(deletedItemKey, itemContent);

  const deletedFlagItemKey = deletedFlagPathFromPath(itemKey);
  await write(deletedFlagItemKey, {});

  await remove(itemKey);

  res.redirect("back");
};
