(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .factory("WikiService", WikiService);


    function WikiService($http, $q){
        var service = {
            searchForLocation: searchForLocation,
            getDestinationDetails: getDestinationDetails
        };

        return service;


        function searchForLocation(location){
            var deferred = $q.defer();

            var url = "https://en.wikivoyage.org/w/api.php?action=query&list=search&srwhat=text&srsearch=" + location +"&format=json&callback=JSON_CALLBACK";
            //var url = "http://www.wikisherpa.com/api/1/search/en/Portland&callback=JSON_CALLBACK";
            $http.jsonp(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getDestinationDetails(destination){
            var deferred = $q.defer();

            var url = "https://en.wikivoyage.org/w/api.php?action=parse&section=0&prop=text&page=" + destination +"&format=json&callback=JSON_CALLBACK";

            $http.jsonp(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }
    }
}());