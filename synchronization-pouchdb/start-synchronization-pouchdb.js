const PouchDB = require("pouchdb");
const configuration = require("../@configuration");
const { getDatabase } = require("../@pouchdb");
const { read, write } = require("../@storage");
const { decrypt, isLocked } = require("../@secrets");

// PouchDB guide about replication: https://pouchdb.com/guides/replication.html

module.exports = async function () {
  if (!configuration.distrib.pouchdb.syncPouchDBEnabled) {
    console.log("[synchronization-pouchdb] Synchronization is disabled");
    return;
  }

  // TODO ACY Trouver un moyen pas trop compliqué d'utiliser
  // le mode de replication live + retry de pouchdb tout en permettant
  // de modifier la liste des remotes pendant l'execution de l'application
  // (surement en stockant les handlers et en les comparant régulièrement
  // à la liste des remotes)
  nextIteration();
};

async function nextIteration() {
  console.log("[synchronization-pouchdb] Start!");
  await write(configuration.distrib.pouchdb.synchronizationStatusKey, {
    lastSync: 0,
  });

  const localDB = getDatabase();

  const remotesInfo = await read(configuration.distrib.pouchdb.remoteListKey);
  const remotes = remotesInfo ? remotesInfo.remotes : [];
  // FOR DEBUG ONLY
  // const remotes = ["http://localhost:5984/db/storage"];

  for (const remote of remotes) {
    console.log(
      "[synchronization-pouchdb] Starting to sync with:",
      remote.name
    );

    const remoteDBOptions = {
      name: remote.url,
    };
    if (remote.login && remote.password) {
      if (isLocked()) {
        console.log(
          "[synchronization-pouchdb] -",
          remote.name,
          "- Skipped, app is locked"
        );
        continue;
      }
      const encryptedPassword = remote.password;
      const decryptedPassword = await decrypt(encryptedPassword);

      remoteDBOptions.auth = {
        username: remote.login,
        password: decryptedPassword,
      };
    }
    const remoteDB = new PouchDB(remoteDBOptions);

    try {
      await syncTwoDB(localDB, remoteDB);
      console.log("[synchronization-pouchdb] -", remote.name, "- Completed");
    } catch (e) {
      console.error("[synchronization-pouchdb] -", remote.name, "- ERROR");
      console.error(e);
    }
  }

  console.log("[synchronization-pouchdb] Ended!");
  await write(configuration.distrib.pouchdb.synchronizationStatusKey, {
    lastSync: Date.now(),
  });

  setTimeout(
    nextIteration,
    configuration.distrib.pouchdb.pouchdbSyncPeriodInMs || 10000
  );
}

async function syncTwoDB(firstDB, secondDB) {
  return new Promise((resolve, reject) => {
    firstDB
      .sync(secondDB)
      .on("error", function (err) {
        reject(err);
      })
      .on("complete", function (change) {
        resolve(change);
      });
  });
}
