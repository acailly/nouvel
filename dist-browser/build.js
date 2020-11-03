const path = require("path");
const fs = require("fs");
const browserify = require("browserify");
const glob = require("glob");

const args = process.argv.slice(2);
const appFolder = args[0];
if (!appFolder) {
  throw new Error("Error: No arguments");
}

function generateFilesToCache(callback) {
  const filesToCache1 = glob.sync("**/*.!(js)", {
    cwd: path.join(__dirname),
  });
  const filesToCache2 = glob.sync("**/*.!(js)", {
    cwd: path.join(__dirname, "..", appFolder),
  });
  const filesToCache3 = glob.sync("**/*.!(js)", {
    cwd: path.join(__dirname, "..", appFolder, "public"),
  });
  const filesToCache = [...filesToCache1, ...filesToCache2, ...filesToCache3];
  const generatedScript = `var filesToCache = ${JSON.stringify(
    filesToCache,
    null,
    2
  )}`;
  fs.writeFileSync(path.join(__dirname, "filesToCache.js"), generatedScript);
  callback();
}

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

  browserify(path.join(__dirname, "..", "start-browser.js"), browserifyConfig)
    // .plugin('tinyify') // TODO ACY
    .bundle()
    .pipe(fs.createWriteStream(path.join(__dirname, "bundle.js")));
}

generateFilesToCache(() => {
  build();
});
