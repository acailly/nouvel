const path = require("path");
const express = require("express");

function serve() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(__dirname)); // to load index.html and bundle
  app.use(express.static(path.join(__dirname, "..", "public"))); // to load CSS
  app.use(express.static(path.join(__dirname, ".."))); // to load view templates

  app.listen(9999);
}

serve();
