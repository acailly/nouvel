const localtunnel = require("localtunnel");

const {get: getIdentity} = require('../identity')
const identity = getIdentity();

const configuration = require("../configuration");

module.exports = async function () {
  const tunnel = await localtunnel({
    port: configuration.tunnellingLocalPort,
    host: configuration.tunnellingHost,
    subdomain: identity.id
  });

  console.log(`The application is available at: ${tunnel.url}`);

  tunnel.on("close", () => {
    console.log("Tunnel closed");
  });
};
