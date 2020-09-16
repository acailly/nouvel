const fs = require("./fsPromisified");

module.exports = async function (filePath) {
  try{
      await fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK)
      return true
  }
  catch(e){
      return false
  }
};