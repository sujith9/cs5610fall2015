"use strict";
var users = require("./user.mock.json");
var uuid = require('uuid');

module.exports = function() {

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
        user['id'] = uuid.v1();
        users.push(user);
        return users[users.length-1];
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
            }
        }

        return users;
    }

    function Delete(userId){
        var len = users.length;

        for(var i = 0; i < len; i++){
            if(users[i]["id"] == userId){
                users.splice(i, 1);
                break;
            }
        }
        return users;
    }
};