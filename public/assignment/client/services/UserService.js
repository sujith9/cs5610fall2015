(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
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
            var url = "http://localhost:3000/api/assignment/user?username="+ username + "&password=" + password;
            $http.get(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function findAllUsers(){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/user";
            $http.get(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function createUser(user){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/user";

            $http.post(url, user)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteUserById(userId){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/user" + userId;

            $http.delete(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateUser(userId, user){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/user/" + userId;

            $http.put(url, user)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }

}());