const { read, write, remove } = require("../../@storage");
const Identity = require("../../@identity");
const deletedPathFromPath = require("../rules/deletedPathFromPath");
const deletedFlagPathFromPath = require("../rules/deletedFlagPathFromPath");

module.exports = async function (req, res) {
  const itemKey = req.body.key;

  const itemContent = await read(itemKey);

  const deletedItemKey = deletedPathFromPath(itemKey);
  await write(deletedItemKey, itemContent);

  const identity = Identity.get().id;
  const splittedItemKey = itemKey.split("/");
  const itemId = splittedItemKey[splittedItemKey.length - 1];
  const feedFolder = splittedItemKey.slice(0, -1).join("/");
  const deletedFlagItemsForCurrentUser = deletedFlagPathFromPath(
    `${feedFolder}/${identity}`
  );
  let currentDeletedItems = await read(deletedFlagItemsForCurrentUser);
  if (!currentDeletedItems) {
    currentDeletedItems = [];
  }
  currentDeletedItems.push(itemId);
  await write(deletedFlagItemsForCurrentUser, currentDeletedItems);

  await remove(itemKey);

  res.redirect("back");
};
