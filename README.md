# pie-tv
Example Node.js webapp for filtering a list of available TV channels according
to category and customer location.

## Prerequisites
Built and tested on Ubuntu 14.04, but should work on other platforms.
Requires [MongoDB](https://docs.mongodb.com/getting-started/shell/installation/)
v3.2+ and [Node.js](https://nodejs.org/en/download/) v6+.

## Configuration
By default, the app will listen on port 3000 and attempt to connect to a Mongo
database at `localhost:27017/pietv`. If you want to change these settings, simply
edit `config.js` in the project root directory.

## Installation
```
npm install
npm run init-hooks
npm run import-fixtures
```

## Running the server
In one terminal window:
```
npm run watch
```

And in another:
```
npm start
```

## Browser support
Tested in Chrome 51, Firefox 47, IE 9

## Running tests
```
npm test
```

## Running eslint (code quality checking)
```
npm run eslint
```
