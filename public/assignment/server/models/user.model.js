"use strict";
//var users = require("./user.mock.json");
//var uuid = require('uuid');
var q = require("q");

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);

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
        var deferred = q.defer();

        UserModel.findOne({"username": username}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials){
        var deferred = q.defer();

        UserModel.findOne({"username": credentials.username, "password": credentials.password}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function Create(user){
        var deferred = q.defer();

        var newUserId = mongoose.Types.ObjectId();
        user._id = newUserId;

        UserModel.create(user, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                UserModel.findOne({"_id": newUserId}, function(err, user){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(user);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function FindAll(){
        var deferred = q.defer();

        UserModel.find(function(err, users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function FindById(userId){
        var deferred = q.defer();

        UserModel.find({"_id": userId}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function Update(userId, user){
        var deferred = q.defer();

        UserModel.update({"_id": userId}, {$set: user}, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                UserModel.findOne({"_id": userId}, function(err, user){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(user);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function Delete(userId){
        var deferred = q.defer();

        UserModel.remove({"_id": userId}, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });

        return deferred.promise;
    }
};