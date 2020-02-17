const { Provider: ProviderMain } = require('rubik-file');

const Bucket = require('./Bucket');
const ProviderError = require('./ProviderError');

class Provider extends ProviderMain {
  constructor() {
    super(...arguments);

    this._buckets = new Map();
  }

  _createBucket(bucket) {
    return new Bucket(bucket, this.options.storageDir);
  }

  _getBucket(bucketName) {
    let bucket = this._buckets.get(bucketName);

    if (!bucket) {
      bucket = this._createBucket(bucketName);
      this._buckets.set(bucketName, bucket);
    }

    return bucket;
  }

  async _call(source, method, ...args) {
    const bucket = this._getBucket(source.bucket);
    return bucket[method](source.key, ...args);
  }

  async write(source, stream) {
    return this._call(source, 'write', stream);
  }

  has(source) {
    return this._call(source, 'has');
  }
}

module.exports = Provider;
