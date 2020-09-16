// From https://medium.com/@vitor.cruz/a-simple-tutorial-showing-how-to-promisify-a-specific-node-js-module-which-usually-uses-callback-47c97ffa57a2
// TODO ACY Utiliser require('fs').promises à la place ?

const fs = require("fs");
const { promisify } = require("util");

module.exports = Object.keys(fs).reduce((acc, fn) => {
  if (fn.match(/(stream|sync)/gi)) {
    acc[fn] = fs[fn];
  } else {
    try {
      acc[fn] = promisify(fs[fn]);
    } catch (err) {
      acc[fn] = fs[fn];
    }
  }
  return acc;
}, {});