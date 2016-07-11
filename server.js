const Promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;


class Server {
    constructor() {
        this.start = Promise.coroutine(this.start);
    }

    * start() {
        const db = yield this.connect();
        const results = yield db.collection('channels').find({}).toArray();
        return results;
    }

    connect() {
        return MongoClient.connect('mongodb://localhost/pietv');
    }
}

const server = new Server();
server.start().then((db) => {
    console.log(db);
});
