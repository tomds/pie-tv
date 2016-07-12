const MongoClient = require('mongodb').MongoClient;

/**
 * Simple class to subclass other services from. Initiates a database connection
 * using the settings URL string passed to the constructor.
 */
class DbAwareService {
    constructor(dbconnectionString) {
        this.dbConnectionString = dbconnectionString;

        // Init database connection
        this.initDb();
    }

    /*
     * Initialises a database connection (as a Promise) and stores it on the
     * object.
     */
    initDb() {
        this.connection = MongoClient.connect(this.dbConnectionString);
    }
}

module.exports = DbAwareService;
