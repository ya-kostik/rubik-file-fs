const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { Given, When, Then } = require('cucumber');

const { Kubiks } = require('rubik-main');
const File = require('rubik-file');

const { createApp } = require('rubik-main/tests/helpers/creators');

const Provider = require('../');


Given('Nikita creates File kubik and application', function() {
  this.app = createApp();
  this.file = new File();
  this.app.add(this.file);
});

Given('creates Config kubik with {string} path', function(configDir) {
  const config = new Kubiks.Config(path.join(__dirname, configDir));
  this.app.add(config);
});

Given('adds {string} Provider to File\'s instance', function(name) {
  this.file.addProvider(name, Provider, true);
});

Given('starts application', async function() {
  return this.app.up();
});

Given('creates readable stream from {string}', function(filePath) {
  this.readableStream = fs.createReadStream(
    path.join(__dirname, filePath)
  );
});

When('he writes file with key {string} and bucket {string}', function(key, bucket) {
  return this.app.file.write({ key, bucket }, this.readableStream);
});

Then('file kubik {has} key {string} in bucket {string}', async function(state, key, bucket) {
  assert(state === await this.app.file.has({ key, bucket }));
});

When('he reads file with key {string} and bucket {string}', async function(key, bucket) {
  this.readStream = await this.app.file.read({ key, bucket });
});

When('he removes file with key {string} and bucket {string}', function (key, bucket) {
  return this.app.file.remove({ key, bucket });
});



