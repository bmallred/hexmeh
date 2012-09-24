'use strict';

angular.module("hexmeh", [])
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        
        $routeProvider.when("/", {
            controller: MainController,
            templateUrl: "partials/intro.html"
        })
        .when("/dump", {
            controller: DumpController,
            templateUrl: "partials/dump.html"
        })
        .otherwise({
            controller: MainController,
            templateUrl: "partials/intro.html"
        });
        //.otherwise({ redirectTo: "/" });
    }]);