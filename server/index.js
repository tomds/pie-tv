const Server = require('./server.js');


const server = new Server('mongodb://localhost/pietv');
server.start();
