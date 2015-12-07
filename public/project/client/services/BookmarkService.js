(function() {
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .factory("BookmarkService", BookmarkService);

    function BookmarkService($http, $q) {

        var service = {
            createBookmarkForUser: createBookmarkForUser,
            findIfBookmarked: findIfBookmarked,
            removeBookmarkForUser: removeBookmarkForUser,
            getBookmarksForUser: getBookmarksForUser
        };

        return service;

        function createBookmarkForUser(userId, title, pageId) {
            var deferred = $q.defer();
            var url = "/api/project/user/bookmark/";
            $http.post(url, {userId: userId, title: title, pageId: pageId})
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function findIfBookmarked(userId, title, pageId){
            var deferred = $q.defer();
            var url = "/api/project/user/"+ userId+"/bookmark/" + title + "/" + pageId;
            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function removeBookmarkForUser(bookmarkId){
            var deferred = $q.defer();
            var url = "/api/project/bookmark/"+ bookmarkId;
            $http.delete(url)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getBookmarksForUser(userId){
            var deferred = $q.defer();
            var url = "/api/project/bookmark/user/"+ userId;
            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }

}());