'use strict';

var express 	= require('express'),
	router 		= express.Router(),
	cities		= require('../../data/cities.json').cities,
	controller 	= require('./weather.controller'),
	_ 			= require('lodash'),
	moment    	= require('moment');


function getCityKey(city){
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
}

// route middleware to validate :city
router.param('city', function(req, res, next, city) {
	var cityPattern = /^[a-z]+$/i,
		location = null;

	var x = cities.map(function(hash){
		/* To ensure cities are not case sensitive */
		location = hash[getCityKey(city)];
	});

	if(_.isUndefined(location) || _.isNull(location) || location.lat === undefined || !cityPattern.test(city)){
		console.error('Invalid City: ' + city);
		res.status(400).json({error: 'Invalid City' });
	}else{
		// go to the next thing
		req.params.lat = location.lat;
		req.params.lon = location.lon;
	}
	next(); 
});

//Does weekday validation and converts the weekday to unix epoch time for forecast.io
router.param('weekday', function(req, res, next, weekday){

	var weekdayRegEx = /(today|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/;

	if(!weekdayRegEx.test(weekday)){
		console.error('Invalid weekday: ' + weekday);
		res.status(400).json({error: 'Invalid weekday' });
	}else{
		
		var today 		 	= moment().day(),
			momentWeekday 	= (weekday.toLowerCase() === 'today') ? today: moment().day(weekday).day();
		//Get next week weekday's data if the weekday has already passed this week. forecast.io city weather does the same.
		req.params.weekday = (today > momentWeekday) ?	moment().day(7+momentWeekday).unix() : moment().day(momentWeekday).unix();
		console.log(' Today: ' + today  + " Weekday:  "+ momentWeekday + " Result: "+ new Date(req.params.weekday*1000));
	}
	next(); 
});


router.get('/:city/:weekday?', controller.index);

router.get('/*', function(req, res){
	res.status(404).json({error: 'Oops..Invalid API call!' });
});

 module.exports = router;