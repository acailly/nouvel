const configuration = require("../@configuration");
const getPouchDBObject = require("./getPouchDBObject");

const CustomPouchDB = getPouchDBObject();
const db = new CustomPouchDB(configuration.localDatabaseName);

module.exports = function () {
  return db;
};
