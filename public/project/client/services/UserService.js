(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .factory("UserService", UserService);

    function UserService($http, $q){

        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };

        return service;

        function findUserByUsernameAndPassword(username, password){
            var deferred = $q.defer();
            var url = "/api/project/user?username="+ username + "&password=" + password;
            $http.get(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function findAllUsers(){
            var deferred = $q.defer();
            var url = "/api/project/user";
            $http.get(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function createUser(user){
            var deferred = $q.defer();
            var url = "/api/project/user";

            $http.post(url, user)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteUserById(userId){
            var deferred = $q.defer();
            var url = "/api/project/user" + userId;

            $http.delete(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateUser(userId, user){
            var deferred = $q.defer();
            var url = "/api/project/user/" + userId;

            $http.put(url, user)
                .success(function(response){
                    deferred.resolve(response);
                })
                .error(function(data, status, headers, config) {
                    console.log(data + status)});

            return deferred.promise;
        }
    }

}());