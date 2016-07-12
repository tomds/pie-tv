const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const nunjucks = require('nunjucks');


class Server {
    constructor(connectionString) {
        this.app = express();
        this.app.set('view engine', 'html');
        nunjucks.configure(
            'views',
            {
                autoescape: true,
                noCache: true,
                express: this.app,
            }
        );

        this.initDb(connectionString);

        this.defineRoutes();
    }

    initDb(connectionString) {
        this.connection = MongoClient.connect(connectionString);
    }

    start() {
        this.app.listen(3000);
    }

    defineRoutes() {
        this.app.use('/static', express.static('bundles'));

        this.app.get('/', (req, res) => {
            this.getCustomers().then((customers) => {
                res.render('index', { customers });
            });
        });
    }

    getCustomers() {
        return this.connection.then((db) => db.collection('customers').find().toArray());
    }
}

module.exports = Server;
