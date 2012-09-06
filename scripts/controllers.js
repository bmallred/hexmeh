'use strict';

function MainController($scope, $routeParams) {
  $scope.binary = generateBinary($scope.binaryLength);
  $scope.binaryLength = 128;
  
  $scope.generate = function () {
      $scope.binary = generateBinary($scope.binaryLength);
      return false;
  };
}