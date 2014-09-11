'use strict';

var request   = require('superagent'),
  chai        = require('chai'),
  expect      = chai.expect,
  should      = require('should'),
  moment      = require('moment'),
  serverURL   = 'http://localhost:9000';

chai.use(require('chai-datetime'));

/*
* Util method to calculate when is the next weekday
*/
function getNextWeekday(weekday){
  var today           = moment().day(),
      momentWeekday   = moment().day(weekday).day(),
      time            = (today > momentWeekday) ?  moment().day(7 + momentWeekday) : moment().day(momentWeekday);
  return new Date(time);
}


describe('GET /api/weather', function() {
  it('should respond with 404', function(done) {
    request
    .get(serverURL + '/api/weather')
    .set('Content-Type', 'application/json')
    .end(function(res){
      expect(res.status).to.equal(404);
      expect(JSON.stringify(res.body)).to.equal(JSON.stringify({error: 'Oops..Invalid API call!' }));
      done();
    });
  });
});

describe('GET /api/weather/:city', function() {

  describe('Invalid City', function() {
    it('should return a message of what was wrong with request', function(done){
      request
      .get(serverURL + '/api/weather/saravana')
      .set('Content-Type', 'application/json')
      .end(function(res){
        expect(res.status).to.equal(400);
        expect(JSON.stringify(res.body)).to.equal(JSON.stringify({error: 'Invalid City' }));
        done();
      });  
    });
  });

  describe('Valid City with mixed caps', function() {
    it('should return a valid json', function(done){
      request
      .get(serverURL + '/api/weather/SyDney')
      .set('Content-Type', 'application/json')
      .end(function(res){

        expect(res.status).to.equal(200);

        expect(res.body).to.have.property('latitude');
        expect(res.body).to.have.deep.property('latitude', -32.15);

        expect(res.body).to.have.property('longitude');
        expect(res.body).to.have.deep.property('longitude',-150.8);

        expect(res.body).to.have.property('timezone');
        expect(res.body).to.have.property('offset');
        expect(res.body).to.have.property('currently');
        expect(res.body.daily.data).to.have.length(8);
        done();
      });  
    });
  });

  describe('Valid City with mixed caps', function() {
    it('should return a valid json', function(done){
      request
      .get(serverURL + '/api/weather/Melbourne')
      .set('Content-Type', 'application/json')
      .end(function(res){

        expect(res.status).to.equal(200);

        expect(res.body).to.have.property('latitude');
        expect(res.body).to.have.deep.property('latitude', -36.2);

        expect(res.body).to.have.property('longitude');
        expect(res.body).to.have.deep.property('longitude',-143.05);

        expect(res.body).to.have.property('timezone');
        expect(res.body).to.have.property('offset');
        expect(res.body).to.have.property('currently');
        expect(res.body.daily.data).to.have.length(8);
        done();
      });  
    });
  });

  
});

describe('GET /api/weather/:city/:weekday', function() {

  describe('Invalid Weekday', function() {
    it('should return a message of what was wrong with request', function(done){
      request
      .get(serverURL + '/api/weather/sydney/saravana')
      .set('Content-Type', 'application/json')
      .end(function(res){
        expect(res.status).to.equal(400);
        expect(JSON.stringify(res.body)).to.equal(JSON.stringify({error: 'Invalid weekday' }));
        done();
      });  
    });
  });

  describe('Weather report for today', function() {
    it('should return a valid json with todays wether', function(done){
      request
      .get(serverURL + '/api/weather/sydney/today')
      .set('Content-Type', 'application/json')
      .end(function(res){

        var today = new Date();

        expect(new Date(res.body.currently.time*1000)).to.equalDate(today);
          //expect(new Date(res.body.daily.data[0].time*1000)).to.equalDate(today);

          expect(res.status).to.equal(200);

          expect(res.body).to.have.property('latitude');
          expect(res.body).to.have.deep.property('latitude', -32.15);
          
          expect(res.body).to.have.property('longitude');
          expect(res.body).to.have.deep.property('longitude',-150.8);

          expect(res.body).to.have.property('timezone');
          expect(res.body).to.have.property('offset');
          expect(res.body).to.have.property('currently');
          expect(res.body.daily.data).to.have.length(1);


          done();
        });  
    });
  });


describe('Weather report for monday', function() {
  it('should return a valid json for the next mondays wether', function(done){
    request
    .get(serverURL + '/api/weather/sydney/monday')
    .set('Content-Type', 'application/json')
    .end(function(res){

      var today = getNextWeekday("monday");

      expect(new Date(res.body.currently.time*1000)).to.equalDate(today);
          //expect(new Date(res.body.daily.data[0].time*1000)).to.equalDate(today);

          expect(res.status).to.equal(200);

          expect(res.body).to.have.property('latitude');
          expect(res.body).to.have.deep.property('latitude', -32.15);
          
          expect(res.body).to.have.property('longitude');
          expect(res.body).to.have.deep.property('longitude',-150.8);

          expect(res.body).to.have.property('timezone');
          expect(res.body).to.have.property('offset');
          expect(res.body).to.have.property('currently');
          expect(res.body.daily.data).to.have.length(1);


          done();
        });  
  });
});

describe('Weather report for tuesday', function() {
  it('should return a valid json for the next tuesdays wether', function(done){
    request
    .get(serverURL + '/api/weather/sydney/tuesday')
    .set('Content-Type', 'application/json')
    .end(function(res){

      var today = getNextWeekday("tuesday");

      expect(new Date(res.body.currently.time*1000)).to.equalDate(today);
          //expect(new Date(res.body.daily.data[0].time*1000)).to.equalDate(today);

          expect(res.status).to.equal(200);

          expect(res.body).to.have.property('latitude');
          expect(res.body).to.have.deep.property('latitude', -32.15);
          
          expect(res.body).to.have.property('longitude');
          expect(res.body).to.have.deep.property('longitude',-150.8);

          expect(res.body).to.have.property('timezone');
          expect(res.body).to.have.property('offset');
          expect(res.body).to.have.property('currently');
          expect(res.body.daily.data).to.have.length(1);


          done();
        });  
  });
});

describe('Weather report for wednesday', function() {
  it('should return a valid json for the next wednesdays wether', function(done){
    request
    .get(serverURL + '/api/weather/sydney/wednesday')
    .set('Content-Type', 'application/json')
    .end(function(res){

      var today = getNextWeekday("wednesday");

      expect(new Date(res.body.currently.time*1000)).to.equalDate(today);
          //expect(new Date(res.body.daily.data[0].time*1000)).to.equalDate(today);

          expect(res.status).to.equal(200);

          expect(res.body).to.have.property('latitude');
          expect(res.body).to.have.deep.property('latitude', -32.15);
          
          expect(res.body).to.have.property('longitude');
          expect(res.body).to.have.deep.property('longitude',-150.8);

          expect(res.body).to.have.property('timezone');
          expect(res.body).to.have.property('offset');
          expect(res.body).to.have.property('currently');
          expect(res.body.daily.data).to.have.length(1);


          done();
        });  
  });
});

describe('Weather report for thursday', function() {
  it('should return a valid json for the next thursdays wether', function(done){
    request
    .get(serverURL + '/api/weather/sydney/thursday')
    .set('Content-Type', 'application/json')
    .end(function(res){

      var today = getNextWeekday("thursday");

      expect(new Date(res.body.currently.time*1000)).to.equalDate(today);
          //expect(new Date(res.body.daily.data[0].time*1000)).to.equalDate(today);

          expect(res.status).to.equal(200);

          expect(res.body).to.have.property('latitude');
          expect(res.body).to.have.deep.property('latitude', -32.15);
          
          expect(res.body).to.have.property('longitude');
          expect(res.body).to.have.deep.property('longitude',-150.8);

          expect(res.body).to.have.property('timezone');
          expect(res.body).to.have.property('offset');
          expect(res.body).to.have.property('currently');
          expect(res.body.daily.data).to.have.length(1);


          done();
        });  
  });
});

describe('Weather report for friday', function() {
  it('should return a valid json for the next fridays wether', function(done){
    request
    .get(serverURL + '/api/weather/sydney/friday')
    .set('Content-Type', 'application/json')
    .end(function(res){

      var today = getNextWeekday("friday");

      expect(new Date(res.body.currently.time*1000)).to.equalDate(today);
          //expect(new Date(res.body.daily.data[0].time*1000)).to.equalDate(today);

          expect(res.status).to.equal(200);

          expect(res.body).to.have.property('latitude');
          expect(res.body).to.have.deep.property('latitude', -32.15);
          
          expect(res.body).to.have.property('longitude');
          expect(res.body).to.have.deep.property('longitude',-150.8);

          expect(res.body).to.have.property('timezone');
          expect(res.body).to.have.property('offset');
          expect(res.body).to.have.property('currently');
          expect(res.body.daily.data).to.have.length(1);


          done();
        });  
  });
});

describe('Weather report for saturday', function() {
  it('should return a valid json for the next saturdays wether', function(done){
    request
    .get(serverURL + '/api/weather/sydney/saturday')
    .set('Content-Type', 'application/json')
    .end(function(res){

      var today = getNextWeekday("saturday");

      expect(new Date(res.body.currently.time*1000)).to.equalDate(today);
          //expect(new Date(res.body.daily.data[0].time*1000)).to.equalDate(today);

          expect(res.status).to.equal(200);

          expect(res.body).to.have.property('latitude');
          expect(res.body).to.have.deep.property('latitude', -32.15);
          
          expect(res.body).to.have.property('longitude');
          expect(res.body).to.have.deep.property('longitude',-150.8);

          expect(res.body).to.have.property('timezone');
          expect(res.body).to.have.property('offset');
          expect(res.body).to.have.property('currently');
          expect(res.body.daily.data).to.have.length(1);


          done();
        });  
  });
});

describe('Weather report for sunday', function() {
  it('should return a valid json for the next sundays wether', function(done){
    request
    .get(serverURL + '/api/weather/sydney/sunday')
    .set('Content-Type', 'application/json')
    .end(function(res){

      var today = getNextWeekday("sunday");

      expect(new Date(res.body.currently.time*1000)).to.equalDate(today);
          //expect(new Date(res.body.daily.data[0].time*1000)).to.equalDate(today);

          expect(res.status).to.equal(200);

          expect(res.body).to.have.property('latitude');
          expect(res.body).to.have.deep.property('latitude', -32.15);
          
          expect(res.body).to.have.property('longitude');
          expect(res.body).to.have.deep.property('longitude',-150.8);

          expect(res.body).to.have.property('timezone');
          expect(res.body).to.have.property('offset');
          expect(res.body).to.have.property('currently');
          expect(res.body.daily.data).to.have.length(1);


          done();
        });  
  });
});


});




