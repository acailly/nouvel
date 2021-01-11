const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;

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

console.log("[distrib-capacitor] Copy assets");
execSync(`npx cap copy android`, {
  cwd: __dirname,
});

console.log("[distrib-capacitor] Open native IDE");
execSync(`npx cap open android`, {
  cwd: __dirname,
});
