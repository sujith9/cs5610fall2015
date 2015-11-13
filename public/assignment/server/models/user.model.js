"use strict";
var users = require("./user.mock.json");

module.exports = function(app) {

    var api ={
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function findUserByUsername(username){
        var user = null;
        var len = users.length;
        for(var i = 0; i < len; i++){
            if(users[i]['username'] == username){
                user = users[i];
            }
        }

        return user;

    }

    function findUserByCredentials(credentials){
        var user = null;
        var len = users.length;
        for(var i = 0; i < len; i++){
            if(users[i]['username'] == credentials.username && users[i]['password'] == credentials.password){
                user = users[i];
            }
        }

        return user;
    }

    function Create(user){
        users.push(user);
        return users;
    }

    function FindAll(){
        return users;
    }

    function FindById(id){
        var user = null;
        var len = users.length;
        for(var i = 0; i < len; i++){
            if(users[i]['id'] == id){
                user = users[i];
            }
        }

        return user;
    }

    function Update(userId, user){
        var len = users.length;

        for(var i = 0; i < len; i++){
            if(users[i]["id"] == userId){
                users[i] = user;

                return users[i];
            }
        }
    }

    function Delete(userId){
        var len = users.length;

        for(var i = 0; i < len; i++){
            if(users[i]["id"] == userId){
                users.splice(i, 1);
                break;
            }
        }
    }
};