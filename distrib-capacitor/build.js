const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;

if (!fs.existsSync(path.join(__dirname, "node_modules"))) {
  console.log("[distrib-capacitor] Install dependencies");
  execSync(`npm install`, {
    cwd: __dirname,
  });
}

console.log("[distrib-capacitor] Generate configuration");
const capacitorConfiguration = require("./capacitor.config");
fs.writeFileSync(
  path.join(__dirname, "capacitor.config.json"),
  JSON.stringify(capacitorConfiguration, null, 2)
);

// TODO UGLY HACK: edit the base URL
const configurationFilePath = path.join(__dirname, "..", "/@configuration.js");
const originalConfiguration = require(configurationFilePath);
const originalConfigurationFileContent = fs.readFileSync(configurationFilePath);
const editedConfiguration = {
  ...originalConfiguration,
  deployBaseURL: originalConfiguration.capacitorBaseURL,
};
fs.writeFileSync(
  configurationFilePath,
  `module.exports = ${JSON.stringify(editedConfiguration)}`
);

console.log("[distrib-capacitor] Build app");
execSync(`npm run browser:build`, {
  cwd: path.join(__dirname, ".."),
});

// TODO END OF UGLY HACK: put back the original base URL
fs.writeFileSync(configurationFilePath, originalConfigurationFileContent);

if (!fs.existsSync(path.join(__dirname, "android"))) {
  console.log("[distrib-capacitor] Install platforms");
  execSync(`npx cap add android`, {
    cwd: __dirname,
  });
}

console.log("[distrib-capacitor] Copy assets");
execSync(`npx cap copy android`, {
  cwd: __dirname,
});

console.log("[distrib-capacitor] Open native IDE");
execSync(`npx cap open android`, {
  cwd: __dirname,
});
