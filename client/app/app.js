/*global app: true*/
'use strict';

var app = angular.module('weatherForecastApp', ['ngRoute','ngGrid']);

	app.value('version', '0.0.1');

  	app.value('testLocations',['Sydney','Melbourne','Canberra','Brisbane','London','Chennai']);


	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$locationProvider.html5Mode(true).hashPrefix('!');
		$routeProvider
	      .when('/', {
	        templateUrl: 'main/main.html',
	        controller: 'WeatherCtrl'
	      });
	}]);