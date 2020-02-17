const fs = require('fs');

module.exports = function isFileExists(filePath) {
  return fs.promises.access(filePath, fs.constants.F_OK).
  then(() => true).
  catch(() => false);
};
