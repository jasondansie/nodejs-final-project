'use strict'

const path = require('path');

const { storageFile } = require('./storageConfig.json');

const { readStorage, writeStorage } = require('./readerWriter');

const storageFilePath = path.join(__dirname, storageFile);

console.log(storageFilePath);