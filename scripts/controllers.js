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
  $scope.instructions = "Drop a file here!";
  $scope.uppercaseHex = false;
  $scope.file = null;
  $scope.lastLine = 0;

  function toggleSwitches() {
    $("input, select").prop("disabled", !$("input, select").prop("disabled"));
  }

  function outputLine(bytes) {
    // Add a break line.
    $("#lineNumbers, #lineHex, #lineCharacters").append("<br>");
    
    // Get the line number.
    var lineNumber = padLeft($scope.lastLine.toString(16), 6);
    if ($scope.uppercaseHex) {
      lineNumber = lineNumber.toUpperCase();
    }
    $("#lineNumbers").append(lineNumber + "<span class='symbol'>:</span>");
    
    for (var i = 0; i < bytes.length; i++) {
      //var progress = $(".percent");
      //var percent = ((i + (($scope.lastLine + 1) * $scope.columns)) / $scope.file.size) * 100;
      //$(progress).text(percent + "%");

      // Get the hex string.
      var hexString = padLeft(bytes[i].toString(16), 2);
      if ($scope.uppercaseHex) {
          hexString = hexString.toUpperCase();
      }
      
      // Output the remaining lines.
      $("#lineHex").append(hexString + "&nbsp;");
      $("#lineCharacters").append(String.fromCharCode(bytes[i]));
    }

    // Increment to next line.
    $scope.lastLine++;
  }

  function readBlob(start, stop) {
    if (start < $scope.file.size) {
      var reader = new FileReader();
      
      // Closure to capture the file information.
      reader.onload = function(evt) {
        var bytes = new Uint8Array(evt.target.result);
        outputLine(bytes);
        readBlob(stop, stop + $scope.columns);
      }

      var blob = mySlice($scope.file, start, stop);
      reader.readAsArrayBuffer(blob);
    }
    else {
      $scope.lastLine = 0;
      $scope.file = null;
      toggleSwitches();
      $("#progress_bar").remove();
    }
  }
  
  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    $("#drop-zone").bind("dragover", function (e) {
      e.stopPropagation();
      e.preventDefault();
      e.originalEvent.dataTransfer.dropEffect = 'copy';
    });
    
    $("#drop-zone").bind("drop", function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      // Remove previous output.
      $("#lineNumbers, #lineHex, #lineCharacters").empty();
      toggleSwitches();

      //$("#drop-zone").append($("<div id='progress_bar'><div class='percent'>0%</div></div>"));
      
      // Retrieve the files.
      var files = e.originalEvent.dataTransfer.files;
      if (files) {
        $scope.file = files[0];
        readBlob(0, $scope.columns);
      }
    });
  } 
  else {
    $scope.fileApi = false;
    $scope.instructions = "Sorry, your browser needs to go to an old folks home.";
    alert('The File APIs are not fully supported in this browser.');
  }
}