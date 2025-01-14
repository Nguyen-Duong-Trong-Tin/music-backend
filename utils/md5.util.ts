const md5 = require("md5");

const encodePassword = (password: string) => {
  return md5(password);
}

const md5Util = {
  encodePassword
};
export default md5Util;