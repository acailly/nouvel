const { read, write, remove } = require("../../@storage");
const deletedKeyFromItemKey = require("../rules/deletedKeyFromItemKey");
const deletedFlagKeyFromItemKey = require("../rules/deletedFlagKeyFromItemKey");

module.exports = async function (req, res) {
  const itemKey = req.body.key;

  const itemContent = await read(itemKey);

  const deletedItemKey = deletedKeyFromItemKey(itemKey);
  await write(deletedItemKey, itemContent);

  const deletedFlagItemKey = deletedFlagKeyFromItemKey(itemKey);
  await write(deletedFlagItemKey, {});

  await remove(itemKey);

  res.redirect("back");
};
