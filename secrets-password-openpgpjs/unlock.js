const _inmemory_password_container = require("./_inmemory_password_container");

module.exports = (password) => {
  _inmemory_password_container.password = password;
};
