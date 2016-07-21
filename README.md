# pie-tv
Example webapp for filtering a list of available TV channels according
to category and customer location. Makes use of the following technologies:

- [Node.js](https://nodejs.org/)
- [Angular](https://angularjs.org/)
- [MongoDB](https://www.mongodb.com/mongodb-3.2)
- [webpack](https://webpack.github.io/)
- ES6/ES2015 (via [Babel](https://babeljs.io/))
- [Eslint](http://eslint.org/) (with [Airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb-base))
- [Mocha](https://mochajs.org/)
- [less](http://lesscss.org/)
- [Express](http://expressjs.com/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)

## Prerequisites
Built and tested on Ubuntu 14.04, but should work on other platforms.
Requires MongoDB v3.2+ and Node.js v6+.

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
