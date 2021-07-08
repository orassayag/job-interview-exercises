const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('../routes');

// Initiate the express app.
const app = express();

// Parse the body params and attache them to the req.body object.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The deflate/gzip compression.
app.use(compression());

// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride());

// Helps you secure your Express app by setting various HTTP headers. It's not a silver
// bullet, but it can help!
app.use(helmet());

// Providing a Connect/Express middleware that can be used to enable
// CORS (Cross Origin Resource Sharing) with various options.
app.use(cors());

// Implement and mount the routes.
app.use('/api', routes);

// ToDo: Add build client route for production here.
// Implement and mount the client files (From Angular.js/React.js/Vue.js build).
// Have Node serve the files for our built React app.
/* app.use(express.static(path.resolve(__dirname, '../build'))); */

// All other GET requests not handled before will return our app.
/* app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
}); */

module.exports = app;