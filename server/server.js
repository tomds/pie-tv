const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const nunjucks = require('nunjucks');

const DbAwareService = require('./db-aware-service');
const CatalogueService = require('./catalogue');
const CustomerLocationService = require('./location');


class Server extends DbAwareService {
    constructor(dbconnectionString) {
        super(dbconnectionString);

        // Initialise an express server
        this.app = express();

        // Set up nunjucks templating engine
        this.app.set('view engine', 'html');
        nunjucks.configure(
            'views',
            {
                autoescape: false,
                noCache: true,
                express: this.app,
            }
        );

        // Add middleware for parsing form submissions
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Add middleware for parsing cookies
        this.app.use(cookieParser());

        // Initialise services, passing them the db connection settings
        this.customerLocationService = new CustomerLocationService(this.dbConnectionString);
        this.catalogueService = new CatalogueService(this.dbConnectionString);

        // Set up URLs
        this.defineRoutes();
    }

    start() {
        this.app.listen(3000);
    }

    defineRoutes() {
        // Serve static files compiled by webpack
        this.app.use('/static', express.static('bundles'));

        // Homepage/customer login page
        this.app.get('/', (req, res) => {
            this.getCustomers().then((customers) => {
                res.render('index', { customers });
            });
        });

        // Login form post
        this.app.post('/login/', (req, res) => {
            this.login(req.body.customer, res).then(() => {
                res.redirect('/channels/');
            });
        });

        // Channel selection page
        this.app.get('/channels/', (req, res) => {
            const customer = this.getLoggedInCustomer(req);

            this.customerLocationService.getLocation(customer.id).then((locationId) => (
                this.catalogueService.getChannels(locationId)
            )).then((channels) => {
                res.render('channels', {
                    loggedInCustomer: customer,
                    channels,
                });
            });
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
     * Set cookies for the customer's ID and name, retrieved from the database
     * using the ID.
     * @param {string} customerId - The customer's ID.
     * @param {Response} res - The response object to set the cookie on.
     * @return {Promise} A Promise which will resolve to the customer object.
     */
    login(customerId, res) {
        // Find customer in dB
        const id = parseInt(customerId, 10);
        return this.connection.then((db) => (
            db.collection('customers').findOne({ customerId: id })
        )).then((customer) => {
            // Set cookies for customer ID, name
            res.cookie('customerId', id);
            res.cookie('customerName', customer.name);
            return customer;
        });
    }

    /**
     * Get the current logged in customer from the cookies, if present.
     * @param {Request} - The request to get the cookies from.
     * @return {object} Customer details in the form {id, name}
     */
    getLoggedInCustomer(req) {
        return {
            id: parseInt(req.cookies.customerId, 10),
            name: req.cookies.customerName,
        };
    }
}

module.exports = Server;
