
angular.module('forecast')
  .controller('forecastCtrl', ['$scope', '$location', 'weatherService',  
    function($scope, $location, weatherService){

      $scope.loadingForecast = weatherService.loadingForecast;

        $scope.getForecast = function(userInput) {

      weatherService.getForecast(userInput)
        .then(function() {
          $location.path('/forecast');
        });
    };

    $scope.Forecast = weatherService.forecastData;

  }]);