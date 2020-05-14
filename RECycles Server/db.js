// import og bruge mongodb.MongoClient
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// forbindelsen til vores Mongo DB atlas database

const dbConnectionUrl = 'mongodb+srv://LucasSimper:Pernille2606@recycles-rf6gy.gcp.mongodb.net/test?authSource=admin&replicaSet=RECycles-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true';

// Vores main funktion til at oprette forbnindelse til Mongo

function initialize(dbName, dbCollectionName, successCallback, failureCallback) {
    MongoClient.connect(dbConnectionUrl, function (err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err);
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);

            console.log("[MongoDB connection] SUCCESS");
            successCallback(dbCollection);
        }
    });
}

module.exports = { initialize };

