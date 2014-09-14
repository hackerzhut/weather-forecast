/*global app: true*/

'use strict';

app.controller('WeatherCtrl', [ '$rootScope', '$scope', '$http', 'weekDays', function($rootScope, $scope, $http, weekDays){

		$scope.weekDays = weekDays;

		function init(){
			$scope.weatherForm = {};
		}

		init();

		$scope.getWeatherReport = function(){
			var city = $scope.weatherForm.city,
				weekday = ($scope.weatherForm.weekday && $scope.weatherForm.weekday !==undefined ) ? $scope.weatherForm.weekday.value : '',
				url = '/api/weather/'+city + '/'+ weekday;
				
			$http.get(url).success(function(weatherReport) {
		    	$scope.weatherReport = weatherReport.daily.data;
		    	$scope.weatherReport.city = city;
		    	//Reset Form
		    	$scope.weatherForm = {};
		    }).error(function(data){
		    	$scope.weatherReport = [];
		    	$scope.weatherForm.errorResponse = data.error;
		    });	
		};

	}]);


