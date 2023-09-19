function isEmail(text) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)) return true;
  return false;
}

module.exports = { isEmail };
