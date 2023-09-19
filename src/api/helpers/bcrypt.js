const bcrypt = require("bcrypt");

const encryptPwd = (data, salt) => {
  return bcrypt.hashSync(String(data), salt);
};

const decryptPwd = (data, hashPwd) => {
  return bcrypt.compareSync(String(data), hashPwd);
};

module.exports = {
  encryptPwd,
  decryptPwd,
};
