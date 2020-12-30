const PouchDB = require("pouchdb");
const express = require("express");

const configuration = require("../@configuration");

module.exports = function () {
  console.log("PouchDB server - Starting");

  const app = express();
  app.use(express.urlencoded({ extended: true }));

  const LocalPouchDB = PouchDB.defaults({
    prefix: `${configuration.localDatabaseFolder}/`,
  });
  app.use("/db", require("express-pouchdb")(LocalPouchDB));
  const db = new LocalPouchDB(configuration.localDatabaseName);

  const port = configuration.pouchdbServerPort;
  app.listen(port, () => {
    console.log(
      "PouchDB server - Listening on port",
      port,
      `: http://localhost:${port}`
    );
  });
};
