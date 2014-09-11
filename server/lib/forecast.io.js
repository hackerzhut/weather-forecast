'use strict';

var request = require('request'),
    util 	= require('util'),
    qs 		= require('querystring'),
    _       = require('lodash'),
    zlib 	= require('zlib');

function ForecastError (errors) {
  Error.captureStackTrace(this, ForecastError);
  this.errors = errors;
}

util.inherits(ForecastError, Error);

ForecastError.prototype.toString = function toString (){
  return "ForecastError: " + this.errors;
}

function Forecast (options) {

	if(_.isNull(options) || _.isEmpty(options)){
		throw new ForecastError('APIKey must be set on Forecast options');	
	}
	/* Setting App specific default options incase if not set */
	this.options 	= options;
  	this.timeout 	= options.timeout || 5000
  	this.url 		= 'https://api.forecast.io/forecast/' + options.APIKey + '/';
}

Forecast.prototype = {

	getForecast : function(lat, lon, time, encoding, callback){

		var timeout 			= this.timeout, 
			queryURL 			= this.url + lat + ',' + lon,
			responseEncoding 	= (_.isUndefined(encoding) || _.isNull(encoding)) ?  "application/json" : encoding;

		if(time){
			queryURL += ',' + time;	
		}

		queryURL = queryURL + '?' + qs.stringify(this.options);
		
		/* Added Gzip to header to accept gzipped response for better performance */
		var options = {
			url: queryURL,
		  	headers: {
		    	'Accept-Encoding': responseEncoding
		  	},
		  	encoding: null,
		  	timeout: timeout
		};

		request.get(options, function (err, res, data) {
			
			if (!err && res.statusCode === 200) {
			    // If response is gzip, unzip first
			    var encoding = res.headers['content-encoding'];
			    console.log('Encoding: '+encoding);
			    if (encoding && encoding.indexOf('gzip') >= 0) {
			    	zlib.gunzip(data, function(error, dezipped) {
			        	var jsonData = dezipped.toString('utf-8');
			        	callback(null, res, JSON.parse(jsonData));
			      	});
			    } else {
			      	// Response is not gzipped
			      	callback(null, res, data);
			    }
			}else{
				callback(err);
			}
		});

	}

}

exports = module.exports = Forecast;