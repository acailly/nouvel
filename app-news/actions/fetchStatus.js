const { read } = require("../../@storage");
const configuration = require("../../@configuration");

module.exports = async function (req, res) {
  const syncInfo = await read(
    configuration.distrib.pouchdb.synchronizationStatusKey
  );
  const lastSync = syncInfo ? syncInfo.lastSync : null;
  const failedRemotes = syncInfo ? syncInfo.failedRemotes : [];

  let message = "";
  if (lastSync === 0) {
    message = "Synchronisation en cours";
  } else if (lastSync) {
    // From https://css-tricks.com/how-to-convert-a-date-string-into-a-human-readable-format/
    // and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const lastSyncHumanReadable = new Date(lastSync).toLocaleString(
      undefined,
      options
    );
    message = `Dernière synchronisation le ${lastSyncHumanReadable}`;

    if (failedRemotes.length) {
      message += ` (erreurs avec : ${failedRemotes.join(",")})`;
    } else {
      message += ` (ok)`;
    }
  } else {
    message = `Les données n'ont pas été synchronisées`;
  }

  res.render("partials/status.html", {
    message,
  });
};
