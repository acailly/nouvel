const fs = require("fs").promises;

module.exports = async function (filePath) {
  try {
    await fs.stat(filePath);
    return true;
  } catch (e) {
    return false;
  }
};
