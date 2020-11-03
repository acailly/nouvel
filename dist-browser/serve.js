const path = require("path");
const express = require("express");
const localtunnel = require("localtunnel");
const configuration = require("../@configuration");

async function serve() {
  const args = process.argv.slice(2);
  const appFolder = args[0];
  if (!appFolder) {
    throw new Error("Error: No arguments");
  }

  const appRootDirectory = path.join(__dirname, "..", appFolder);

  const app = express();
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(__dirname)); // to load index.html and bundle
  app.use(express.static(path.join(appRootDirectory, "public"))); // to load CSS
  app.use(express.static(path.join(appRootDirectory))); // to load view templates

  const port = 9999;

  app.listen(9999, () => {
    console.log(
      "APP",
      appFolder,
      "STARTED ON PORT ",
      port,
      ": http://localhost:",
      port
    );
  });

  try {
    const tunnel = await localtunnel({
      port: port,
      host: configuration.tunnellingHost,
      subdomain: appFolder,
    });

    console.log(`The application is available at: ${tunnel.url}`);

    tunnel.on("close", () => {
      console.log("Tunnel closed");
    });
  } catch (e) {
    console.error(e);
  }
}

serve();
