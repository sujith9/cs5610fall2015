(function() {
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http, $q) {

        var service = {
            createReviewForDestination: createReviewForDestination,
            findReviewsForDestination: findReviewsForDestination
        };

        return service;

        function createReviewForDestination(reviewObject) {
            var deferred = $q.defer();
            var url = "/api/project/destination/review/";
            $http.post(url, reviewObject)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findReviewsForDestination(title, pageId){
            var deferred = $q.defer();
            var url = "/api/project/destination/review/" + title + "/" + pageId;
            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
}());