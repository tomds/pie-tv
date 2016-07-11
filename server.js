const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const nunjucks = require('nunjucks');


class Server {
    constructor() {
        this.start = Promise.coroutine(this.start);

        this.app = express();
        this.app.set('view engine', 'html');
        nunjucks.configure(
            'views',
            {
                autoescape: true,
                express: this.app,
            }
        );

        this.defineRoutes();
    }

    * start() {
        this.db = yield MongoClient.connect('mongodb://localhost/pietv');
        this.app.listen(3000);
    }

    defineRoutes() {
        this.app.use('/static', express.static('bundles'));

        this.app.get('/', (req, res) => {
            res.render('index');
        });
    }
}

const server = new Server();
server.start();
