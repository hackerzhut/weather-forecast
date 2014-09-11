/**
 * Express configuration
 */

 'use strict';

 var  express         = require('express'),
      bodyParser      = require('body-parser'),
      favicon         = require('serve-favicon'),
      morgan          = require('morgan'),
      compression     = require('compression'),
      methodOverride  = require('method-override'),
      errorHandler    = require('errorhandler'),
      path            = require('path'),
      config          = require('./environment');

 module.exports = function(app) {

  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride());
  
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};