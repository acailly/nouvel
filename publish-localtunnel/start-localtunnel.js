const localtunnel = require('localtunnel');

const configuration = require('../configuration')

module.exports = async function(){
  const tunnel = await localtunnel({ port: configuration.applicationServerPort });

  console.log(`The application is available at: ${tunnel.url}.localtunnel.me`)

  tunnel.on('close', () => {
    console.log("Tunnel closed")
  });
};