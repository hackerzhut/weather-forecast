'use strict';

app.controller('WeatherCtrl', [ '$rootScope', '$scope', '$http', 'testLocations', function($rootScope, $scope, $http, testLocations){

		function init(){
			$scope.message = 'Please select a location';
		}

		init();
		
		$scope.testLocations = testLocations;

		$scope.formatReort = function(){
			for(var index = 0; index < $scope.weatherReport.length; index++){
				var epochTime = $scope.weatherReport[index].time;
				var day =  (new Date(epochTime*1000));
				$scope.weatherReport[index].time = day;
			}
		};

		$rootScope.$on('locationSelect', function (){
			if ($scope.location === undefined) {
		        init();
		        $scope.weatherReport = '';
		        $scope.contentAvailable = false;
		    }else{
		    	$scope.message = '';
		    	$http.get('/api/weather/'+$scope.location).success(function(weatherReport) {
		    		$scope.weatherReport = weatherReport.daily.data;
		    		$scope.formatReort(weatherReport.daily.data);
					$scope.gridOptions = {
					    data: 'weatherReport',
					    columnDefs: [
						    {field:'time', displayName:'Date', cellFilter: 'date:\'MM/dd/yyyy\'', width: 100},
						    {field:'summary', displayName:'Summary', width: 250},
						    {field:'temperatureMax', displayName:'Max Temp', width: 120},
						    {field:'temperatureMin', displayName:'Min Temp', width: 120},
						    {field:'precipType', displayName:'Precip Type', width: 120},
						    {field:'dewPoint', displayName:'Dew Point', width: 120},
						    {field:'windSpeed', displayName:'Wind Speed', width: 120},
						    {field:'cloudCover', displayName:'Cloud Cover', width: 120},
						    {field:'pressure', displayName:'Pressure', width: 120},
						    {field:'humidity', displayName:'Humidity', width: 70}
					    ]
					};
					$scope.contentAvailable = true;
			    });
		    }
		});

	    $scope.setLocation = function(location){
	    	$scope.location = location;
	    	$rootScope.$broadcast('locationSelect');
	    };
	    
	}]);


