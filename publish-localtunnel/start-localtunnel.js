const localtunnel = require("localtunnel");

const configuration = require("../configuration");

module.exports = async function () {
  const tunnel = await localtunnel({
    port: configuration.applicationServerPort,
    host: configuration.tunnellingHost,
    subdomain: configuration.tunnellingSubDomain
  });

  console.log(`The application is available at: ${tunnel.url}`);

  tunnel.on("close", () => {
    console.log("Tunnel closed");
  });
};
