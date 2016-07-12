const config = require('../config.js');
const Server = require('./server.js');


const server = new Server(config.dbConnectionString);
server.start();
