const { FileError } = require('rubik-file');

const STORAGE_DIR_IS_INVALID = 'storageDir option is not defined or invalid';
const FILE_ALREADY_EXISTS = 'file already exists';
const KEY_IS_NOT_SAFE = 'key isn\'t safe';

class BucketError extends FileError {}

BucketError.STORAGE_DIR_IS_INVALID = STORAGE_DIR_IS_INVALID;
BucketError.FILE_ALREADY_EXISTS = FILE_ALREADY_EXISTS;
BucketError.KEY_IS_NOT_SAFE = KEY_IS_NOT_SAFE;

module.exports = BucketError;
