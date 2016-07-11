# pie-tv
Example Node.js webapp for filtering a list of available TV channels according
to category and customer location.

## Prerequisites
Built and tested on Ubuntu 14.04, but should work on other platforms.
Requires [MongoDB](https://docs.mongodb.com/getting-started/shell/installation/)
v3.2+ and [Node.js](https://nodejs.org/en/download/) v6+.

## Configuration
Get mongo server settings from local file

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

## Running tests
```
npm test
```
