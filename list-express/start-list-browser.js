// to fix the iconv-lite error with streams
process.versions.node = undefined;
// to use promisify until a better solution: https://github.com/browserify/browserify/issues/1978
require("util.promisify/shim")();

BrowserFS.configure(
  {
    fs: "IndexedDB",
    options: {
      storeName: "app",
    },
  },
  function (e) {
    if (e) {
      throw e;
    }
    console.log("BrowserFS is ready-to-use!");
  }
);

const browserExpress = require("browser-express");
const app = browserExpress({
  interceptFormSubmit: true,
});

const commonAppConfig = require("./common-app-config");
commonAppConfig(app);

app.listen({}, () => {
  console.log("APP STARTED");
});
