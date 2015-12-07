(function() {
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .factory("VisitService", VisitService);

    function VisitService($http, $q) {

        var service = {
            createVisitForUser: createVisitForUser,
            getPeopleVisitingPlace: getPeopleVisitingPlace,
            getVisitsForUser: getVisitsForUser
        };

        return service;

        function createVisitForUser(visitObject){
            var deferred = $q.defer();
            var url = "/api/project/destination/visit/";
            $http.post(url, visitObject)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getPeopleVisitingPlace(title, pageId){
            var deferred = $q.defer();
            var url = "/api/project/destination/visit/" + title + "/" + pageId;
            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function getVisitsForUser(userId){
            var deferred = $q.defer();
            var url = "/api/project/visit/user/" + userId;
            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
}());