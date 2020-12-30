const PouchDB = require("pouchdb");
const configuration = require("../@configuration");
const { getDatabase } = require("../@pouchdb");

// PouchDB guide about replication: https://pouchdb.com/guides/replication.html

module.exports = async function () {
  if (!configuration.syncPouchDBEnabled) {
    console.log("[synchronization-pouchdb] Synchronization is disabled");
    return;
  }

  const localDB = getDatabase();

  // TODO ACY Récupérer la liste des remotes dans PouchDB,
  // sous la clé "_local/remotes" qu'on trouvera dans
  //configuration.remoteListKey
  const remotes = ["http://localhost:5984/db"];

  // TODO ACY Gérer les mots de passe
  // TODO ACY Gérer le chiffrement des mots de passe avec @secrets

  for (const remote of remotes) {
    console.log("[synchronization-pouchdb] Starting to sync with:", remote);

    const remoteDB = new PouchDB(remote);

    localDB
      .sync(remoteDB, {
        live: true,
        retry: true,
      })
      .on("error", function (err) {
        console.error("[synchronization-pouchdb] ERROR");
        console.error(err);
      })
      // FOR DEBUG
      .on("change", function (change) {
        console.log("[synchronization-pouchdb] -", remote, "- CHANGE");
      })
      .on("paused", function (info) {
        console.log("[synchronization-pouchdb] -", remote, "- PAUSED");
      })
      .on("active", function (info) {
        console.log("[synchronization-pouchdb] -", remote, "- RESUMED");
      });
  }
};
