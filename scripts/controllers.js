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

function DumpController($scope, $routeParams) {
  $scope.columns = 16;
  $scope.fileApi = false;
  $scope.files = [];
  
  $scope.showFiles = function () {
    return $scope.files;
  };
  
  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    $(window).bind("dragover", function (e) {
      e.stopPropagation();
      e.preventDefault();
      e.originalEvent.dataTransfer.dropEffect = 'copy';
    });
    
    $(window).bind("drop", function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      var files = e.originalEvent.dataTransfer.files;
      
      for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            var bytes = new Uint8Array(e.target.result);
            
            $scope.files.push({
              "name": theFile.name,
              "bytes": bytes
            });

            /*var c = 0;
            for (var i = 0; i < bytes.length; i++) {
              if (c++ >= 16) {
                $("#tabFile1").append("<br>");
                c = 0;
              }
              
              $("#tabFile1").append(bytes[i].toString(16) + " ");
            }*/
          };
        })(f);
        
        // Read in the image file as a data URL.
        reader.readAsArrayBuffer(f);
      }
    });
  } else {
    $scope.fileApi = false;
    alert('The File APIs are not fully supported in this browser.');
  }
}