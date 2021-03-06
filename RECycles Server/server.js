// server.js


// Dette
const express = require('express');
const server = express();

const body_parser = require("body-parser");

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = 4000;

// << db setup >>
const db = require("./db");
const dbName = "WebshopData";
const collectionName = "products";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function (err, result) {
        if (err) throw err;
      // console.log(result);

        // << return response to client >>
    });

    // << db CRUD routes >>
    server.get("/items/:id", (request, response) => {
        const itemId = request.params.id;

        dbCollection.findOne({ id: itemId }, (error, result) => {
            if (error) throw error;
            // return item
            response.json(result);
        });
    });

    server.get("/items", (request, response) => {
        // return updated list
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
            // send back entire updated list after successful request
            dbCollection.find().toArray(function (_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });
}, function (err) { // failureCallback
    throw (err);
});


const dbName1 = "Login";
const collectionName1 = "User";

db.initialize(dbName1, collectionName1, function (dbCollection1) { // successCallback
    // get all items
    dbCollection1.find().toArray(function (err, result) {
        if (err) throw err;
       // console.log(result);

        // << return response to client >>
    });

    // << db CRUD routes >>
    server.post("/Users", (request, response) => {
        const item = request.body;
        dbCollection1.insertOne(item, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return updated list
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
            // return item
            response.json(result);
        });
    });

    server.get("/Users", (request, response) => {
        // return updated list
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
            // send back entire updated list after successful request
            dbCollection1.find().toArray(function (_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });
}, function (err) { // failureCallback
    throw (err);
});

const dbName2 = "UserTransactions";
const collectionName2 = "Transactions";

db.initialize(dbName2, collectionName2, function (dbCollection2) { // successCallback
    // get all items
    dbCollection2.find().toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);

        // << return response to client >>
    });

    // << db CRUD routes >>
    server.post("/Transactions", (request, response) => {
        const item = request.body;
        dbCollection2.insertOne(item, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return updated list
        });
    });

    server.get("/Transactions/:emailID", (request, response) => {
        const itemId = request.params.emailID;
        dbCollection2.find({ emailID: itemId }).toArray(function (error,result) {
           // if (error) throw error;
            // return item
            response.json(result);
        });
    });

    server.get("/Transactions", (request, response) => {
        // return updated list
        dbCollection2.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
            console.log(result);
        });
    });

    server.delete("/Transactions/:_id", (request, response) => {
        const itemId = request.params.id;
        console.log("Delete Transaction with id: ", itemId);

        dbCollection2.deleteOne({ id: itemId }, function (error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
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