const path = require("path");
const execSync = require("child_process").execSync;

console.log("[distrib-capacitor] Build app");
execSync(`npm run browser:build`, {
  cwd: path.join(__dirname, ".."),
});

console.log("[distrib-capacitor] Copy assets");
execSync(`npx cap copy android`, {
  cwd: __dirname,
});

console.log("[distrib-capacitor] Open native IDE");
execSync(`npx cap open android`, {
  cwd: __dirname,
});
