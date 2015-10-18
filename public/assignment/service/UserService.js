(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService(){
        var currentUsers = [];

        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        }

        return service;

        function findUserByUsernameAndPassword(){

        }

        function findAllUsers(){

        }

        function createUser(){

        }

        function deleteUserById(){

        }

        function updateUser(){

        }
    }

}());