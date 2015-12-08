(function() {
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .factory("FollowService", FollowService);

    function FollowService($http, $q) {

        var service = {
            followUser: followUser,
            unfollowUser: unfollowUser,
            findIfFollowing: findIfFollowing,
            findAllFollowingUsers: findAllFollowingUsers
        };

        return service;

        function followUser(currentUserId, followUserId) {
            var deferred = $q.defer();
            var url = "/api/project/follow/";
            $http.post(url, {userId: currentUserId, followUser: followUserId})
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function unfollowUser(followId){
            var deferred = $q.defer();
            var url = "/api/project/follow/" + followId;
            $http.delete(url)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findIfFollowing(currentUserId, followUserId){
            var deferred = $q.defer();
            var url = "/api/project/follow/currentUser/" + currentUserId + "/followUser/" + followUserId;
            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findAllFollowingUsers(userId){
            var deferred = $q.defer();
            var url = "/api/project/follow/user/" + userId;
            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

    }
}());