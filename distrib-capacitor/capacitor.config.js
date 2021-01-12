// capacitor.config.js is not yet supported in the current version of capacitor

module.exports = {
  appId: "distrib.capacitor",
  appName: "application",
  bundledWebRuntime: false,
  npmClient: "npm",
  webDir: `../output/distrib-browser`,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
  cordova: {},
  linuxAndroidStudioPath: "studio.sh",
};
