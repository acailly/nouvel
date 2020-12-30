const { read, write, remove } = require("../../@storage");
const deletedPathFromPath = require("./deletedPathFromPath");
const deletedFlagPathFromPath = require("./deletedFlagPathFromPath");

module.exports = async function (itemKey) {
  const itemContent = await read(itemKey);

  const deletedItemKey = deletedPathFromPath(itemKey);
  await write(deletedItemKey, itemContent);

  const deletedFlagItemKey = deletedFlagPathFromPath(itemKey);
  await write(deletedFlagItemKey, {});

  await remove(itemKey);
};
