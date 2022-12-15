'use strict';

const Datastorage = require('./storage/dataStorageLayer');

const storage = new Datastorage();

//storage.getAll().then(console.log).catch(console.log);
storage.getOne(90).then(console.log).catch(console.log);