const fs = require('fs');
const path = require('path');
const isString = require('lodash/isString');
const { isKeySafe, isBucket } = require('rubik-file');
const nanoid = require('nanoid');

const isFileExists = require('../lib/isFileExists');
const waitForStream = require('../lib/waitForStream');
const BucketError = require('./BucketError');

class Bucket {
  constructor(bucketName, storageDir) {
    this._checkConstructorParams(bucketName, storageDir);

    if (!storageDir.endsWith('/')) storageDir += '/';

    this.name = bucketName;
    this.dir = path.join(storageDir, bucketName, '/');
  }

  _createBucketDir() {
    return fs.promises.mkdir(this.dir);
  }

  async _removeBucketDir() {
    return fs.promises.rmdir(this.dir, {
      recursive: true,
      maxRetries: 10
    });
  }

  async _init() {
    if (await isFileExists(this.dir)) return;
    return this._createBucketDir();
  }

  async clear() {
    if (await isFileExists(this.dir)) {
      await this._removeBucketDir();
    }
    return this._init();
  }

  _checkConstructorParams(bucketName, storageDir) {
    BucketError.is(
      isBucket(bucketName),
      BucketError.INVALID_BUCKET
    );
    BucketError.is(
      storageDir && isString(storageDir),
      BucketError.STORAGE_DIR_IS_INVALID
    );
  }

  _getFilePath(fileName) {
    return path.join(this.dir, fileName);
  }

  _getIndexPath(key) {
    BucketError.is(
      isKeySafe(key),
      BucketError.KEY_IS_NOT_SAFE
    )
    return this._getFilePath(`${key}.index`);
  }

  async has(key) {
    await this._init();
    return isFileExists(this._getIndexPath(key));
  }

  async _createIndexFile(key, id) {
    const filePath = this._getIndexPath(key);
    await fs.promises.writeFile(filePath, id);
  }

  async write(key, readStream) {
    BucketError.is(
      !(await this.has(key)),
      BucketError.FILE_ALREADY_EXISTS
    );

    const id = nanoid();

    const writeStream = fs.createWriteStream(this._getFilePath(id));
    readStream.pipe(writeStream);

    await waitForStream(readStream);

    await this._createIndexFile(key, id);
  }
}

module.exports = Bucket;
