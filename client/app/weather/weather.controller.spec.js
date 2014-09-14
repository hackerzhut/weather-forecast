'use strict';

describe('Controller: WeatherCtrl', function () {

  // load the controller's module
  beforeEach(module('weatherForecastApp'));

  var WeatherCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/weather/sydney')
      .respond([{ daily: { data: []} }]);

    scope = $rootScope.$new();
    WeatherCtrl = $controller('WeatherCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of weekdays to the scope', function () {
    //$httpBackend.flush();
    expect(scope.weekDays.length).toBe(8);
  });

  it('should return empty weather form', function () {
      expect(scope.weatherForm).toEqual({});
  });

});
