const path = require("path");
const fs = require("fs");

const browserify = require("browserify");

const browserfsPath = require.resolve("browserfs");
const browserifyConfig = {
  // Override Browserify's builtins for buffer/fs/path.
  builtins: Object.assign({}, require("browserify/lib/builtins"), {
    buffer: require.resolve("browserfs/dist/shims/buffer.js"),
    fs: require.resolve("browserfs/dist/shims/fs.js"),
    path: require.resolve("browserfs/dist/shims/path.js"),
  }),
  insertGlobalVars: {
    // process, Buffer, and BrowserFS globals.
    // BrowserFS global is not required if you include browserfs.js
    // in a script tag.
    process: function () {
      return "require('browserfs/dist/shims/process.js')";
    },
    Buffer: function () {
      return "require('buffer').Buffer";
    },
    BrowserFS: function () {
      return "require('" + browserfsPath + "')";
    },
  },
};

browserify(path.join(__dirname, "server-serviceworker.js"), browserifyConfig)
  .bundle()
  .pipe(
    fs.createWriteStream(
      path.join(__dirname, "..", "dist", "serviceworker", "express-service.js")
    )
  );
