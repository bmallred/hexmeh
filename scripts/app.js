'use strict';

angular.module("hexmeh", [])
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        
        $routeProvider.when("/", {
            controller: MainController,
            templateUrl: "partials/intro.html"
        })
        .otherwise({
            controller: MainController,
            templateUrl: "partials/intro.html"
        });
        //.otherwise({ redirectTo: "/" });
    }])
    .directive('fadey', function() {
        return {
            restrict: 'A',
            link: function(scope, elm, attrs) {
                var duration = parseInt(attrs.fadey);
                
                if (isNaN(duration)) {
                    duration = 500;
                }
                
                elm = jQuery(elm);
                elm.hide();
                elm.fadeIn(duration)
                
                scope.destroy = function(complete) {
                    elm.fadeOut(duration, function() {
                        if (complete) {
                            complete.apply(scope);
                        }
                    });
                };
            }
        };
    });;