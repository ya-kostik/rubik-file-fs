const { Provider: ProviderMain } = require('rubik-file');

const Bucket = require('./Bucket');

class Provider extends ProviderMain {
  constructor() {
    super(...arguments);

    this._buckets = new Map();
  }

  async clear() {
    const promises = [];

    this._buckets.forEach((bucket) => {
      promises.push((bucket.clear()));
    });

    await Promise.all(promises);
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

  async has(source) {
    return this._call(source, 'has');
  }
}

module.exports = Provider;
