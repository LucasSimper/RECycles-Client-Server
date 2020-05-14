
// Dette gøre at vi importer og bruger express
const express = require('express');
const server = express();

const body_parser = require("body-parser");

// Dette bruger vi til at undgå sikkerheds fejl når man forsøger at komme ind på ports på egne netværk

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// parse JSON (application/json content-type)
server.use(body_parser.json());

// Siger den port vi bruger er 4000

const port = 4000;

//  database setup for produkter
const db = require("./db");
const dbName = "WebshopData";
const collectionName = "products";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    // hent alt
    dbCollection.find().toArray(function (err, result) {
        if (err) throw err;
      // console.log(result);
    });

    // db CRUD routes
    server.get("/items/:id", (request, response) => {
        const itemId = request.params.id;

        dbCollection.findOne({ id: itemId }, (error, result) => {
            if (error) throw error;
            // return en produkt
            response.json(result);
        });
    });

    server.get("/items", (request, response) => {
        // return alle produkter
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
            console.log(result);
        });
    });

    server.delete("/items/:id", (request, response) => {
        const itemId = request.params.id;
        console.log("Delete item with id: ", itemId);

        dbCollection.deleteOne({ id: itemId }, function (error, result) {
            if (error) throw error;
            // sletter en også sender den opdaterede liste tilbage
            dbCollection.find().toArray(function (_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });
}, function (err) { // failureCallback
    throw (err);
});


// databsase og Crud routes for Users, er i samme stil som for produkts, hvis i tvivl så se kommentar til produkts

const dbName1 = "Login";
const collectionName1 = "User";

db.initialize(dbName1, collectionName1, function (dbCollection1) { // successCallback
    // get all items
    dbCollection1.find().toArray(function (err, result) {
        if (err) throw err;
       // console.log(result);
    });

    server.post("/Users", (request, response) => {
        const item = request.body;
        dbCollection1.insertOne(item, (error, result) => { // callback of insertOne
            if (error) throw error;
          //  dbCollection1.find().toArray((_error, _result) => { // callback of find
            //    if (_error) throw _error;
             //   response.json(_result);
           // });
        });
    });

    server.get("/Users/:email", (request, response) => {
        const itemId = request.params.email;

        dbCollection1.findOne({ email: itemId }, (error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    server.get("/Users", (request, response) => {
        dbCollection1.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
            console.log(result);
        });
    });

    server.delete("/Users/:email", (request, response) => {
        const itemId = request.params.email;
        console.log("Delete User with email: ", itemId);

        dbCollection1.deleteOne({ email: itemId }, function (error, result) {
            if (error) throw error;
           /* dbCollection1.find().toArray(function (_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });

            */
        });
    });
}, function (err) { // failureCallback
    throw (err);
});

// databsase og Crud routes for transactions, er i samme stil som for produkts, hvis i tvivl så se kommentar til produkts

const dbName2 = "UserTransactions";
const collectionName2 = "Transactions";

db.initialize(dbName2, collectionName2, function (dbCollection2) { // successCallback
    dbCollection2.find().toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
    });

    server.post("/Transactions", (request, response) => {
        const item = request.body;
        dbCollection2.insertOne(item, (error, result) => { // callback of insertOne
            if (error) throw error;
        });
    });

    server.get("/Transactions/:emailID", (request, response) => {
        const itemId = request.params.emailID;
        dbCollection2.find({ emailID: itemId }).toArray(function (error,result) {
           // if (error) throw error;
            response.json(result);
        });
    });

    server.get("/Transactions", (request, response) => {
        dbCollection2.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
            console.log(result);
        });
    });

    // DEtte bliver ikke brugt i vorer nuværende fase men kan bruges i fremtiden til at slette transaktioner

    server.delete("/Transactions/:_id", (request, response) => {
        const itemId = request.params.id;
        console.log("Delete Transaction with id: ", itemId);

        dbCollection2.deleteOne({ id: itemId }, function (error, result) {
            if (error) throw error;
            dbCollection2.find().toArray(function (_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });
}, function (err) { // failureCallback
    throw (err);
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});