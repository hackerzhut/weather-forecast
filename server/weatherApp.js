/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var weatherApp = express();
var server = require('http').createServer(weatherApp);
require('./config/express')(weatherApp);
require('./routes')(weatherApp);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, weatherApp.get('env'));
});

// Expose weatherApp
exports = module.exports = weatherApp;