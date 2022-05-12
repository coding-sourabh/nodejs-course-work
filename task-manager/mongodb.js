const {
    ObjectID
} = require('bson');
const mongodb = require('mongodb');
const {
    debugPort
} = require('process');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database !");
    }

    console.log("connection successful !!");

    const db = client.db(databaseName);

    // C OF CRUD
    // db.collection('users').insertOne({
    //     name: 'sourabh',
    //     age: 22
    // }, (error, result) => {
    //     if(error) {
    //         return console.log("Unable to insert document");
    //     }

    //     console.log("result = ", result.acknowledged);
    // });

    // db.collection('tasks').insertMany([{
    //         description: 'Task 1',
    //         completed: 'false'
    //     },
    //     {
    //         description: 'Task 2',
    //         completed: 'false'
    //     },
    //     {
    //         description: 'Task 2',
    //         completed: 'false'
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert documents");
    //     }
    //     console.log(result.acknowledged);
    // })

    // R of CRUD
    // db.collection('users').findOne({
    //     name: 'sourabh'
    // }, (error, result) => {
    //     if (error) {
    //         console.log("unable to fetch");
    //     }
    //     console.log(result);
    // });

    // db.collection('users').findOne({
    //     _id: new ObjectID('62440cf31e6368b17cb6b551')   // id se not stored as string but binary values
    // }, (error, result) => {
    //     if (error) {
    //         console.log("unable to fetch");
    //     }
    //     console.log(result);
    // })

    // find return a cursor
    // db.collection('users').find({age : 22}).toArray((error, result)=>{
    //     if(error) return console.log(error);
    //     console.log(result);
    // })

    // db.collection('users').find({age : 22}).count((error, count)=>{
    //     if(error) return console.log(error);
    //     console.log(count);
    // })


    // U of CRUD
    // instead of using callback this time we are going to use promise returned by the method
    // db.collection('users').updateOne({
    //     name: "sourabh"
    // }, {
    //     $set: {
    //         name: "naruto"
    //     }
    // })
    // .then((result) => {
    //     console.log(result.modifiedCount);
    // })
    // .catch((e) => {
    //     console.log(e);
    // })

    // D of CRUD
    db.collection('users').deleteOne({
        name: "sourabh"
    }).then((result) => {
        console.log(result);
    }).catch((e) => {
        console.log(e);
    })


})