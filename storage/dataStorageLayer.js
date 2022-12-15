'use strict';

const {CODES, MESSAGES} = require('./statusCodes');

const { getAllFromStorage, getFromStorageWithNumber, addToStorage, updateEntry, deleteEntry } = require('./storageLayer');

//Datastorage class

module.exports = class Datastorage{
    get CODES(){
        return CODES;
    }

    getAll(){
       return getAllFromStorage();
    }

    getOne(number){
        console.log("getting one");
        return new Promise(async (resolve, reject) => {
            if (!number) {
                reject(MESSAGES.NOT_FOUND('---empty---'));
            }
            else{
                const result = await getFromStorageWithNumber(number);
                if (result) {
                    resolve(result);
                }
                else{
                    reject(MESSAGES.NOT_FOUND(number));
                }
            }
        });
    }
}