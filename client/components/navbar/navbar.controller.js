/*global app: true*/

'use strict';

app.controller('NavbarCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location){
      $scope.menu = [/*{
        'title': 'Home',
        'link': '/'
      }*/];

      $scope.isCollapsed = true;

      $scope.isActive = function(route) {
        return route === $location.path();
      };

  }]);
