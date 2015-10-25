(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService(){

        var currentUsers = [
            {"id":"049e6016-4eb9-83ed-937e-f86f42459bff","username":"bob","password":"b","firstname":"Bob","lastname":"Marley","email":"bob@gmail.com"}
            //{username : 'alice', password : 'password', email : 'alice@cnn.com'},
            //{username : 'bob', password : 'password', email : 'bob@bbc.com'},
            //{username : 'charlie', password : 'password', email : 'charlie@neu.edu'}
        ];

        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };

        return service;

        function findUserByUsernameAndPassword(username, password, callback){
            var user = null;
            var len = currentUsers.length;
            for(var i = 0; i < len; i++){
                if(currentUsers[i]['username'] == username && currentUsers[i]['password'] == password){
                    user = currentUsers[i];
                }
            }

            return user;

        }

        function findAllUsers(callback){
            return currentUsers;
        }

        function createUser(user, callback){
            user["id"] = guid();
            currentUsers.push(user);

            return user;
        }

        function deleteUserById(userId, callback){
            var len = currentUsers.length;

            for(var i = 0; i < len; i++){
                if(currentUsers[i]["id"] == userId){
                    currentUsers.splice(i, 1);
                }
            }

            return currentUsers;
        }

        function updateUser(userId, user, callback){
            var len = currentUsers.length;

            for(var i = 0; i < len; i++){
                if(currentUsers[i]["id"] == userId){
                    currentUsers[i] = user;

                    return currentUsers[i];
                }
            }
        }

        // Using the implementation provided by Prof. Jose on Piazza
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }

}());