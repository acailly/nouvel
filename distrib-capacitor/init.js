const execSync = require("child_process").execSync;

console.log("[distrib-capacitor] Install dependencies");
execSync(`npm install`, {
  cwd: __dirname,
});

console.log("[distrib-capacitor] Install platforms");
execSync(`npx cap add android`, {
  cwd: __dirname,
});
