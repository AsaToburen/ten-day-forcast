
'use strict';

angular.module('forecast')
  .factory('weatherService', ['$http', '$q', function($http, $q) {

    var weather = {

      wundEndpoint: 'http://api.wunderground.com/api/',
      
      forecastData: {},
      loadingForecast: false,

      getForecast: function(userInput) {

        weather.loadingForecast = true;

        var deferred = $q.defer();

        var req = $http.get('http://api.aerisapi.com/forecasts/' + userInput + '?fields=periods.timestamp,periods.minTempF,periods.weather,periods.icon,periods.maxTempF,loc.lat,loc.long,&limit=10&client_id=6dC6rxKzfhRryQAf3pdKb&client_secret=BK8JefbKY4sWeANiJzNkfIBIrp5PltTtnQMVl2Pm');

        req.success(function(data) {

          deferred.resolve(data);

          var coordinates = [data.response[0].loc.long, data.response[0].loc.lat];
          var string = coordinates.join();

          weather.parseData(data);
          weather.getLocationData(string);
        });
        return deferred.promise;
      },

      getLocationData: function(coordinates) {

        var deferred = $q.defer();

        var req = $http.get('http://api.aerisapi.com/forecasts/closest?p=' + coordinates + '&client_id=6dC6rxKzfhRryQAf3pdKb&client_secret=BK8JefbKY4sWeANiJzNkfIBIrp5PltTtnQMVl2Pm');

        req.success(function(data) {

          deferred.resolve(data);
        });
        return deferred.promise;
      },

      parseData: function(data) {
        weather.forecastData = data.response[0].periods;
        weather.loadingForecast = false;
      }
    };
    return weather;

  }]);