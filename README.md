# Rubik's File system provider for File Kubik

# Using
This module is rather a demo.
It is not the most optimal, and is written to show an example
of a Provider for the `rubik-file` module.

Anyway, it can be used in small projects.
As always at your own fear and risk.

## Install `rubik-main`, `rubik-file` and `rubik-file-fs` modules
### Via Yarn
```sh
yarn add rubik-main rubik-file rubik-file-fs
```
### Via NPM
```sh
npm i rubik-main rubik-file rubik-file-fs
```
## Create config directory and `file.js` file in it
```js
module.exports = {
  provider: 'FS',
  FS: {
    // This is the path to a folder where files will be stored
    storageDir: path.join(__dirname, '../files')
  }
};
```
## Create an application, add config kubik and file kubik
```js
const path = require('path');
const { App, Kubiks } = require('rubik-main');
const File = require('rubik-file');

const app = new App();
app.add([
  // First argument is a directory with configs
  new Config(path.join('./config/')),
  new File()
]);
```
## Add the FSProvider constructor
```js
const FSProvider = require('rubik-file-fs');
//...
app.file.addProvider('FS', FSProvider);
```

## Up the application
```js
app.up().
then(() => {}).
catch((err) => {
  console.error(err);
  process.exit(1);
});
```

## Write your fist file
```js
app.up().
then(async () => {
  const readStream = fs.createReadStream(
    path.join(__dirname, './some-file.txt')
  );
  await app.file.write({
    key: 'some-file.txt',
    bucket: 'some-bucket'
  }, readStream);
}).
catch((err) => {
  console.error(err);
  process.exit(1);
});
```
