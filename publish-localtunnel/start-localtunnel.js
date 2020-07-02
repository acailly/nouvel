const localtunnel = require("localtunnel");

const configuration = require("../configuration");

module.exports = async function () {
  const tunnel = await localtunnel({
    port: configuration.applicationServerPort,
    host: "http://serverless.social" // See https://github.com/localtunnel/localtunnel/issues/343
  });

  console.log(`The application is available at: ${tunnel.url}`);

  tunnel.on("close", () => {
    console.log("Tunnel closed");
  });
};
