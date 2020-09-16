const path = require("path");
const fs = require("fs");

const browserify = require("browserify");

function build() {
  let browserfsPath = require.resolve("browserfs");
  // Ensure the path is POSIX and not Windows (https://stackoverflow.com/a/63251716)
  browserfsPath = browserfsPath.split(path.sep).join(path.posix.sep);

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

  browserify(
    path.join(__dirname, "..", "start-browser.js"),
    browserifyConfig
  )
    .bundle()
    .pipe(fs.createWriteStream(path.join(__dirname, "bundle.js")));
}

build();
