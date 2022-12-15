'use strict'

const path = require('path');

const { storageFile, adapterfile } = require('./storageConfig.json');

const { readStorage, writeStorage } = require('./readerWriter');
const { dirname } = require('path');

const storageFilePath = path.join(__dirname, storageFile);

const  { adapt } = require(path.join(__dirname, adapterfile));

const getAllFromStorage = async () => {
    return readStorage(storageFilePath);
}

const getFromStorageWithNumber = async (number) =>{
    return (await readStorage(storageFilePath)).find(item =>item.number == number) || null;
}

const addToStorage = async (newEntry) => {
    const storageData = await readStorage(storageFilePath);
    storageData.push(adapt(newEntry));
    return await writeStorage(storageFilePath, storageData);
}




//Tests
//getAllFromStorage().then(console.log).catch(console.log);
//getFromStorageWithNumber(2).then(console.log).catch(console.log);
addToStorage(
    {
        "number":"12",
        "name":"World of Warcraft",
        "quantity":12,
        "rating":"*****",
        "genre":"MMORP"
    }
).then(console.log).catch(console.log);