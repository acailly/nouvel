const path = require("path");
const express = require("express");

async function serve() {
  const outputPath = path.join(__dirname, "..", "output", "distrib-browser");

  const app = express();
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(outputPath));

  const port = 9999;

  app.listen(9999, () => {
    console.log("APP STARTED ON PORT ", port, `: http://localhost:${port}`);
  });
}

serve();
