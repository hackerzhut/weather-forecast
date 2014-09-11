# WeatherApp Candidate Exercise

"WeatherApp" is a candidate exercise using express, AngularJS project that makes use of the [forecast.io](http://forecast.io/)
service for fetching and displaying weather data and forecasts based on a given city and day. Also this app exposes a flexible
API end points to consume the response on different clients.

Note: [forecast.io](https://developer.forecast.io/docs/v2#time_call) assumes the timezones for given latitude and longitude.

## Demo

A demo of the application can be found [here](http://my-weather-app.herokuapp.com/)

## API End points 

The paremeters city and weekday are case-insensitive.

```
GET /api/weather/:city/
GET /api/weather/sydney/
```
Gets the weather for sydney from today for one week. A invalid city will return a appropriate JSON response

```
GET /api/weather/:city/:weekday
GET /api/weather/sydney/monday
```
Gets the weather for monday. If the day has passed, then it will return the weather for the following week. A invalid city will return a appropriate JSON response

```
GET /api/weather/:city/today
```
Gets the today's weather for sydney.


## WeatherApp Uses

- node.js [0.10.x](http://nodejs.org/)
- [grunt](https://www.npmjs.org/package/grunt)
- [bower](http://bower.io/)
- [forecast.io](http://forecast.io/)

## Setup

To install all the dependencies

```
	git clone git://github.com/hackerzhut/weather-forecast.git
	cd weather-forecast
	npm install
	bower install	
```

## Running   

```
grunt server

or

node server/weatherApp.js
```

## Testing

To run jshint and/or tests

```
grunt

or

npm test

```

## License

[The MIT License](http://opensource.org/licenses/MIT)
