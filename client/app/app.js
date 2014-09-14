/*global app: true*/
'use strict';

var app = angular.module('weatherForecastApp', ['ngRoute','ngGrid']);

	app.value('version', '0.0.1');

  	app.value('weekDays',[
  		{ name: 'Today', value: 'today'},
  		{ name: 'Monday', value: 'monday'},
  		{ name: 'Tuesday', value: 'tuesday'},
  		{ name: 'Wednesday', value: 'wednesday'},
  		{ name: 'Thursday', value: 'thursday'},
  		{ name: 'Friday', value: 'friday'},
  		{ name: 'Saturday', value: 'saturday'},
  		{ name: 'Sunday', value: 'sunday'}
  	]);

	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$locationProvider.html5Mode(true).hashPrefix('!');
		$routeProvider
	      .when('/', {
	        templateUrl: 'app/main/main.html',
	        controller: 'WeatherCtrl'
	      });
	}]);