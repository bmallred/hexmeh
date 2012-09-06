'use strict';

function MainController($scope, $routeParams) {
  $scope.allowedLengths = [4, 8, 16, 32, 64, 128, 256];
  $scope.binaryLength = 64;
  $scope.binary = generateBinary($scope.binaryLength);
  $scope.parts = [];
  $scope.hex = "";
  
  $scope.displayResults = function () {
      return $scope.hex.length > 0;
  };
  
  $scope.generate = function () {
      $scope.binary = generateBinary($scope.binaryLength);
      $scope.parts = [];
      $scope.hex = "";
      
      return false;
  };
  
  $scope.solve = function () {
      $scope.parts = [];
      $scope.hex = "";
      
      var original = $scope.binary;
      
      while (original.length > 0) {
          // Find the 16 bytes we need.
          var part = original.substr(-4);
          var character = binaryToHex(part);
          
          // Divvy this stuff up.
          $scope.parts.push({ "binary": part, "hex": character });
          $scope.hex = character + $scope.hex;
          
          // Remove the last four.
          original = original.substr(0, original.length - 4);
      }
      
      return false;
  };
}