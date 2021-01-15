const path = require("path");
const fs = require("fs");
const browserify = require("browserify");
const glob = require("glob");
const makeDir = require("make-dir");
const rimraf = require("rimraf");
const configuration = require("../@configuration");
const application = require("../@application");

const outputPathRoot = path.join(__dirname, "..", "output", "distrib-browser");
rimraf.sync(outputPathRoot);
makeDir.sync(outputPathRoot);

const baseUrlPath = configuration.deployBaseURL || "";
const outputPath = path.join(outputPathRoot, baseUrlPath);
if (!fs.existsSync(outputPath)) {
  makeDir.sync(outputPath);
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
      makeDir.sync(targetDirectory);
    }
    fs.copyFileSync(path.join(genericAssetsPath, fileToCache), targetFile);
  }

  // List app assets to cache
  const appAssetsPath = application.rootPath;
  const filesFromAppAssets = glob.sync("!(public)/**/*.!(js)", {
    cwd: appAssetsPath,
  });

  // Move all these files to output directory
  for (const fileToCache of filesFromAppAssets) {
    const targetFile = path.join(outputPath, fileToCache);
    const targetDirectory = path.dirname(targetFile);
    if (!fs.existsSync(targetDirectory)) {
      makeDir.sync(targetDirectory);
    }
    fs.copyFileSync(path.join(appAssetsPath, fileToCache), targetFile);
  }

  // List app public assets to cache
  const appPublicAssetsPath = application.publicPath;
  const filesFromAppPublicAssets = glob.sync("**/*.!(js)", {
    cwd: appPublicAssetsPath,
  });

  // Move all these files to output directory
  for (const fileToCache of filesFromAppPublicAssets) {
    const targetFile = path.join(outputPath, fileToCache);
    const targetDirectory = path.dirname(targetFile);
    if (!fs.existsSync(targetDirectory)) {
      makeDir.sync(targetDirectory);
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
  const generatedCacheScript = `var filesToCache = ${JSON.stringify(
    filesToCache,
    null,
    2
  )}`;
  fs.writeFileSync(
    path.join(outputPath, "filesToCache.js"),
    generatedCacheScript
  );

  // Generate file serviceworker-configuration.js
  const serviceWorkerConfiguration = {
    baseURL: configuration.deployBaseURL,
    corsProxyURL: configuration.corsProxyURL,
  };
  const generatedConfigScript = `var serviceWorkerConfiguration = ${JSON.stringify(
    serviceWorkerConfiguration,
    null,
    2
  )}`;
  fs.writeFileSync(
    path.join(outputPath, "serviceworker-configuration.js"),
    generatedConfigScript
  );

  // Copy Service Worker
  fs.copyFileSync(
    path.join(__dirname, serviceWorkerFile),
    path.join(outputPath, serviceWorkerFile)
  );

  callback();
}

function exportBundle() {
  const browserifyConfig = {
    builtins: Object.assign({}, require("browserify/lib/builtins"), {
      // Fix with openpgpjs
      // see : https://github.com/openpgpjs/openpgpjs/issues/472#issuecomment-237918797
      openpgp: require.resolve("openpgp/dist/openpgp.min.js"),
    }),
  };

  browserify(path.join(__dirname, "start.js"), browserifyConfig)
    // .plugin('tinyify') // TODO ACY
    .bundle()
    .pipe(fs.createWriteStream(path.join(outputPath, bundleFile)));
}

exportAssets(() => {
  exportBundle();
});
