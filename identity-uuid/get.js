const { keyExists, write, read } = require("../@storage");
const configuration = require("../@configuration");
const generate = require("./generate");

module.exports = async function () {
  const identityAlreadyExists = await keyExists(configuration.identityKey);

  if (!identityAlreadyExists) {
    console.log("Identity file doesn't exist, generate it");
    const identity = generate();
    await write(configuration.identityKey, identity);
  }

  const identity = await read(configuration.identityKey);
  return identity;
};
