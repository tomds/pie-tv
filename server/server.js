const bodyParser = require('body-parser');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const nunjucks = require('nunjucks');


class Server {
    constructor(connectionString) {
        // Initialise an express server
        this.app = express();

        // Set up nunjucks templating engine
        this.app.set('view engine', 'html');
        nunjucks.configure(
            'views',
            {
                autoescape: true,
                noCache: true,
                express: this.app,
            }
        );

        // Add middleware for parsing form submissions
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Init database connection
        this.initDb(connectionString);

        // Set up URLs
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

        this.app.post('/login/', (req, res) => {
            this.setCustomerCookie(req.body.customer, res);
            res.redirect('/channels/');
        });
    }

    /**
     * Get all customers in the database to populate the login dropdown with.
     * @return {Promise} The Promise object which will resolve to an array of customers.
     */
    getCustomers() {
        return this.connection.then((db) => db.collection('customers').find().toArray());
    }

    /**
     * Set a simple cookie containing the customer's ID, as submitted through
     * the login form. We don't validate the ID at this point; the cookie value
     * will be checked on each page load to ensure it hasn't been tampered with.
     * @param {string} customerId - the customer's ID.
     * @param {Response} res - the response object to set the cookie on.
     */
    setCustomerCookie(customerId, res) {
        res.cookie('customerId', customerId);
    }
}

module.exports = Server;
