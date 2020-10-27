const path = require("path");
const express = require("express");

function serve() {
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

  app.listen(9999, () => {
    console.log("APP", appFolder, "STARTED ON PORT 9999");
  });
}

serve();
