const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { Given, When, Then } = require('cucumber');

const Bucket = require('../classes/Bucket');

Given('Nikita creates bucket for some reason with {string} name and {string} storage directory', function(bucketName, storageDir) {
  const bucket = new Bucket(bucketName, path.join(__dirname, storageDir));
  this.bucket = bucket;
});

When('he writes file {string} in bucket with key {string}', async function(filePath, fileKey) {
  const readStream = fs.createReadStream(path.join(__dirname, filePath));
  await this.bucket.write(fileKey, readStream);
});

Then('bucket should has {string}', async function(fileKey) {
  assert(await this.bucket.has(fileKey));
});

When('he reads file {string} from bucket', async function (fileKey) {
  this.readStream = await this.bucket.read(fileKey);
});
