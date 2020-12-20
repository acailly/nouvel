const _inmemory_password_container = require("./_inmemory_password_container");

module.exports = () => {
  return !_inmemory_password_container.password;
};
