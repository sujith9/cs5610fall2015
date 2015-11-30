(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("DestinationController", DestinationController)
        .filter('unsafe', function($sce) {
            return function(val) {
                return $sce.trustAsHtml(val);
            };
        });

    function DestinationController(WikiService, $routeParams) {
        var model = this;
        var destination = $routeParams.destination;
        destination = destination.replace('-', '/');

        WikiService.getDestinationDetails(destination).then(function(response){
            var find = '/wiki/';
            var re = new RegExp(find, 'g');

            response.parse.text["*"] = response.parse.text["*"].replace(re, 'https://en.wikivoyage.org/wiki/');
            model.destinationDetails = response;
        });

        model.searchLocation = function (location) {
            WikiService.searchForLocation(location).then(function(response){
                model.results = response;
            });
        }
    }
})();