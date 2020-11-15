const path = require("path");
const fs = require("fs");
const browserify = require("browserify");
const glob = require("glob");
const mkdirp = require("mkdirp");
const configuration = require("../@configuration");

const args = process.argv.slice(2);
const appFolder = args[0];
if (!appFolder) {
  throw new Error("Error: No arguments");
}

const baseUrlPath = configuration.deployBaseURL || "";
const outputPath = path.join(
  __dirname,
  "..",
  "output",
  "distrib-browser",
  baseUrlPath
);
if (!fs.existsSync(outputPath)) {
  mkdirp.sync(outputPath);
}

const serviceWorkerFile = "serviceworker.js";
const bundleFile = "bundle.js";

function exportAssets(callback) {
  // List generic assets to cache
  const genericAssetsPath = path.join(__dirname, "assets");
  const filesFromGenericAssetPath = glob.sync("**/*.!(js)", {
    cwd: genericAssetsPath,
  });

  // Move all these files to output directory
  for (const fileToCache of filesFromGenericAssetPath) {
    const targetFile = path.join(outputPath, fileToCache);
    const targetDirectory = path.dirname(targetFile);
    if (!fs.existsSync(targetDirectory)) {
      mkdirp.sync(targetDirectory);
    }
    fs.copyFileSync(path.join(genericAssetsPath, fileToCache), targetFile);
  }

  // List app assets to cache
  const appAssetsPath = path.join(__dirname, "..", appFolder);
  const filesFromAppAssets = glob.sync("!(public)/**/*.!(js)", {
    cwd: appAssetsPath,
  });

  // Move all these files to output directory
  for (const fileToCache of filesFromAppAssets) {
    const targetFile = path.join(outputPath, fileToCache);
    const targetDirectory = path.dirname(targetFile);
    if (!fs.existsSync(targetDirectory)) {
      mkdirp.sync(targetDirectory);
    }
    fs.copyFileSync(path.join(appAssetsPath, fileToCache), targetFile);
  }

  // List app public assets to cache
  const appPublicAssetsPath = path.join(__dirname, "..", appFolder, "public");
  const filesFromAppPublicAssets = glob.sync("**/*.!(js)", {
    cwd: appPublicAssetsPath,
  });

  // Move all these files to output directory
  for (const fileToCache of filesFromAppPublicAssets) {
    const targetFile = path.join(outputPath, fileToCache);
    const targetDirectory = path.dirname(targetFile);
    if (!fs.existsSync(targetDirectory)) {
      mkdirp.sync(targetDirectory);
    }
    fs.copyFileSync(path.join(appPublicAssetsPath, fileToCache), targetFile);
  }

  const filesToCache = [
    ...filesFromGenericAssetPath,
    ...filesFromAppAssets,
    ...filesFromAppPublicAssets,
    bundleFile,
  ];

  // Generate file filesToCache.js
  const generatedScript = `var filesToCache = ${JSON.stringify(
    filesToCache,
    null,
    2
  )}`;
  fs.writeFileSync(path.join(outputPath, "filesToCache.js"), generatedScript);

  // Copy Service Worker
  fs.copyFileSync(
    path.join(__dirname, serviceWorkerFile),
    path.join(outputPath, serviceWorkerFile)
  );

  callback();
}

function exportBundle() {
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
    .pipe(fs.createWriteStream(path.join(outputPath, bundleFile)));
}

exportAssets(() => {
  exportBundle();
});
