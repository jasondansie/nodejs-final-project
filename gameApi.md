# Game data storage

## game data json

```json
[
    {
        "number":3,
        "name":"Jigsaw puzzle",
        "quantity":10,
        "rating":"*****",
        "genre":"brain-twister"
    },
    {
        "number":1,
        "name":"Star Adventure",
        "quantity":1,
        "rating":"****",
        "genre":"FPS"
    }
]
```

Each id is unique!

### Public API (methods of Datastorage class)

#### dataStorageLayer.js
-   getAll()
    -   returns an array of all games / []
-   getOne(id)
    -   returns an game object / NOT_FOUND
-   insert(newGame)
    -   returns INSERT_OK / NOT_INSERTED / ALREADY_IN_USE
-   update(updatedGame)
    -   returns UPDATE_OK / NOT_UPDATED
-   remove(id)
    -   REMOVE_OK / NOT_FOUND / NOT_REMOVED
-   getters for status codes
    -   returns an array of status codes

### Private API

#### readerWriter.js

-   readStorage(storageFile)
    -   returns an array of games / []

-   writeStorage(storageFile, data)
    -   returns true/false

#### storageLayer.js
-   getAllFromStorage()
    -   returns an array of games / []

-   getFromStorage(id)
    -   returns an game object / null

-   addToStorage(newGame)
    -   returns true / false

-   updateStorage(updatedGame)
    -   returns true / false

-   removeFromStorage(id)
    -   returns true / false

#### statusCodes.js

```js
const CODES={
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    ...
}
```

The format of an status/error message is:

```js
const MESSAGES={
    PROGRAM_ERROR: ()=> ({
        message:'There seems to be an error. Sorry!',
        code:CODES.PROGRAM_ERROR,
        type:'error'
    }),
    NOT_FOUND: id=>({
        message:`No game found with id ${id}`,
        code:CODES.NOT_FOUND,
        type:'error'
    }),
    INSERT_OK: id=>({
        message:`Game ${id} was inserted`,
        code:CODES.INSERT_OK,
        type:'info'
    })
}
```
status types are `error` or `info`
