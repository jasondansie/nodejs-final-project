'use strict';

const path = require('path');

const express = require('express');

const app = express();

const { port, host, storage } = require('./serverConfig.json');

const Datastorage = require(path.join(__dirname, storage.storageFolder, storage.dataLayer));

const dataStorage = new Datastorage();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const menuPath = path.join(__dirname, 'menu.html');

app.get('/', (req, res) => res.sendFile(menuPath));

app.get('/all', (req, res) =>
    dataStorage.getAll().then(data => res.render('allGames', {result:data}))
);

app.get('/getGame', (req, res) => 
    res.render('getSingleGame',{
        title: 'get',
        header1:'get',
        action:'/getSingleGame'
    })
);

app.post('/getSingleGame', (req, res) => {
    if (!req.body) return res.sendStatus(500);

    dataStorage.getOne(req.body.id)
    .then(game => res.render('gamePage', {result:game}))
    .catch(error => sendErroPage(res, error));
});

app.get('/inputForm', (req, res) =>  
res.render('form', {
    title: "Add game",
    header1: "Add a new game",
    action: "/input",
    number: {value: "", readonly: ""},
    name: {value: "", readonly: ""},
    quantity: {value: "", readonly: ""},
    rating: {value: "", readonly: ""},
    genre: {value: "", readonly: ""},
})
);

app.post('/input', (req, res) => {
    if (!req.body) return res.statusCode(500);

    dataStorage.insert(req.body)
    .then(status => sendStatusPage(res, status))
    .catch(error => sendErroPage(res, error))
})

app.get('/updateForm', (req, res) =>  
res.render('form', {
    title: "Update game",
    header1: "Update game data",
    action: "/updateData",
    number: {value: "", readonly: ""},
    name: {value: "", readonly: "readonly"},
    quantity: {value: "", readonly: "readonly"},
    rating: {value: "", readonly: "readonly"},
    genre: {value: "", readonly: "readonly"},
})
);

app.post('/updateData', (req, res) => {
    if(!req.body) return res.sendStatus(500);

    dataStorage.getOne(req.body.number)
    .then(game => 
        res.render('form', {
            title: "Update game",
            header1: "Update game data",
            action: "/update",
            number: {value: game.number, readonly: "readonly"},
            name: {value: game.name, readonly: ""},
            quantity: {value: game.quantity, readonly: ""},
            rating: {value: game.rating, readonly: ""},
            genre: {value: game.genre, readonly: ""},
        }))
    .catch(error => sendErroPage(res, error));
});

app.post('/update', (req, res) => {
    if (!req.body) return res.statusCode(500);

    dataStorage.update(req.body)
    .then(status => sendStatusPage(res, status))
    .catch(error => sendErroPage(res, error))
});

app.get('/removeGame', (req, res) => 
    res.render('getSingleGame',{
        title: 'Remove',
        header1:'Remove',
        action:'/removeGame'
    })
);

app.post('/removeGame', (req, res) => {
    if (!req.body) return res.sendStatus(500);

    dataStorage.remove(req.body.id)
    .then(status => sendStatusPage(res, status))
    .catch(error => sendErroPage(res, error));
});

app.listen(port, host, () => console.log(`Server running on port ${port} on ${host}`));

const sendErroPage = (res, error, title='Error', header1='Error') => {
    sendStatusPage(res, error, title, header1);
}

const sendStatusPage = (res, status, title='Status', header1='Status') => {
    return res.render('statusPage', {title, header1, status});
}