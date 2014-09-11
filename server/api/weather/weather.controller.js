/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /weather                    ->  index
 * GET     /weather/:city              ->  get weather for the given city
 * GET     /weather/:city/:location    ->  get weather for the given city on a particular weekday
 */

'use strict';

var   _       = require('lodash'),
      config  = require('../../config/environment/index'),
    Forecast  = require('../../lib/forecast.io');

// Get list of things
exports.index = function(request, response) {

  var city    =   request.params.city,
      lat     =   request.params.lat,
      lon     =   request.params.lon,
    weekday   =   request.params.weekday,
    options   =   config.forecastIO.options,
    encoding  =   request.header('accept-encoding'),
    forecast  =   new Forecast(options); 

//Encoding added to API to request Gzipped response for better performance. At later stages can be extended to clients
  forecast.getForecast(lat, lon, weekday, encoding, function (err, forecastResponse, forecastData) {
    if (err) throw err;
    //console.log(forecastResponse);
    response.json(forecastData);
  });
  
}
  