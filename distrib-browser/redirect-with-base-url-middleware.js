const ejs = require("ejs");
const configuration = require("../@configuration");

function redirectWithBaseURLMiddleware() {
  return (req, res, next) => {
    const isBrowser = res.get === res.set; // both set to noop by nighthawk (https://github.com/wesleytodd/nighthawk/blob/master/lib/response.js#L63)
    if (isBrowser) {
      res.redirect = monkeyPatchRedirect(res.redirect.bind(res));
    } else {
      // don't change anything when running with node+express
    }

    next();
  };
}

module.exports = redirectWithBaseURLMiddleware;

function monkeyPatchRedirect(redirect) {
  return function (arg1, arg2) {
    let editedArg2 = arg2;
    if (
      configuration.deployBaseURL &&
      typeof arg2 === "string" &&
      arg2.startsWith("/")
    ) {
      editedArg2 = `${configuration.deployBaseURL}${arg2}`;
    }
    return redirect(arg1, editedArg2);
  };
}
