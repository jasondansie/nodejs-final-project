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

    insert(entry){
        return new Promise(async (resolve, reject) => {
            if (entry) {
               if (!entry.number) {
                    reject(MESSAGES.NOT_INSERTED());
               } 
               else if(await getFromStorageWithNumber(entry.number)){
                reject(MESSAGES.ALREADY_IN_USE(entry.number));
               }
               else if(await addToStorage(entry)){
                  resolve(MESSAGES.INSERT_OK(entry.number));
               }
               else{
                reject(MESSAGES.NOT_INSERTED());
               }
            }
            else{
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    }

    update(entry){
        return new Promise(async (resolve, reject) => {
            if (entry) {
                if (await updateEntry(entry)) {
                    resolve(MESSAGES.UPDATE_OK(entry.number));
                }
                else{
                    reject(MESSAGES.NOT_UPDATED());
                }
            }
            else{
                reject(MESSAGES.NOT_UPDATED());
            }
        })
    }

    remove(id){
        return new Promise(async (resolve, reject) => {
            if (!id) {
                reject(MESSAGES.NOT_FOUND(id));
            }
            else if(await deleteEntry(id)){
                resolve(MESSAGES.REMOVE_OK(id));
            }
            else{
               reject(MESSAGES.NOT_REMOVED(id)); 
            }
        })
    }
}