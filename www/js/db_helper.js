//Connect to DB
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var fs = require('fs');

// Connection URL
var url = 'mongodb://tipdev:tipdev123567@ds123534.mlab.com:23534/tiplineapplication';

//mongodb.MongoClient.connect(uri, function (error, db) {
//   assert.ifError(error);

//    var bucket = new mongodb.GridFSBucket(db);

    // Use bucket...
//});

var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}


// Test connect to the server

var testconnection = function () {
    MongoClient.connect(url, function (err, db) {
        user = {}
        user['firstname'] = "FirstnameTest";
        user['lastname'] = "LastNameTest";
        user['email'] = "Emailtest";
        assert.equal(null, err);
        console.log("Connected successfully to server");
        //db.close()
        mongoAddUser(user, db, function () {
            db.close();
        });
    });
}
//testconnection();

var addUser = function (user, db, callback) {
    console.log("In Add User Function 2");
    db.collection('users').insertOne({
        "FirstName": user['firstname'],
        "LastName": user['lastname'],
        "Email": user['email']
        //"PhoneNumber": user['number'],
        //"RegistrationDate": user['date'],
        //"UserID": 
    }, function (err, result) {
        assert.equal(err, null);
        console.log("Added User to AppUser collection");
        callback();
    });
};


function mongoAddUser(user) {
    console.log("In Add User Function");
    MongoClient.connect(url, function (err, db) {
        //console.log("Asserting error");
        assert.equal(null, err);
        console.log("Calling AddUser");
        addUser(user, db, function () {
            db.close();
        });
    });
}
/*
var MongoClientGR = require('mongodb').MongoClient,
    Grid = require('mongodb').Grid;

report = ["Item1", "Item2"];
submitReport(report);

function submitReport(report) {
    MongoClientGR.connect(url, function (err, db) {
        if (err) return console.dir(err);

        var grid = new Grid(db, 'fs');
        var buffer = new Buffer(report);
        grid.put(buffer, function (err, fileInfo) {
            if (!err) {
                console.log("Finished writing file to Mongo");
            }
        });
    });
}
*/


/*var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

var db = new Db('test', new Server('localhost', 27017));
// Establish connection to db
db.open(function (err, db) {
    // Create a new grid instance
    var grid = new Grid(db, 'fs');
    // Some data to write
    var originalData = new Buffer('Hello world');
    // Write data to grid
    grid.put(originalData, {}, function (err, result) {
        // Fetch the content
        grid.get(result._id, function (err, data) {
            assert.deepEqual(originalData.toString('base64'), data.toString('base64'));

            db.close();
        });
    });
});*/
