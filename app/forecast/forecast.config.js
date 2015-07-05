'use strict';

var app = angular.module('forecast', ['ui.bootstrap', 'ngRoute',]);


  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'landing/landing.view.html',
        controller: 'forecastCtrl',
      })
      .when('/forecast', {
        templateUrl: 'forecast/forecast.view.html',
        controller: 'forecastCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);