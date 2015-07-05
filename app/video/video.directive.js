'use strict';

angular.module('forecast')
  .directive('videoback', function() {
    return {
      restrict: 'E',
      templateUrl: 'video/video.partial.html',
      replace: true,
      scope: true
    };
  });