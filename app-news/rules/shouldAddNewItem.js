const { keyExists } = require("../../@storage");
const deletedFlagKeyFromItemKey = require("./deletedFlagKeyFromItemKey");

module.exports = async (itemKey) => {
  const itemAlreadyExists = await keyExists(itemKey);
  if (itemAlreadyExists) {
    return false;
  }

  const deletedFlagItemKey = deletedFlagKeyFromItemKey(itemKey);
  const itemHasBeenDeleted = await keyExists(deletedFlagItemKey);
  if (itemHasBeenDeleted) {
    return false;
  }

  return true;
};
