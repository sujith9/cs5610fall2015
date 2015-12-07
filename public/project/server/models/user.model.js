"use strict";
var q = require("q");

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.js")(mongoose);
    var UserModelProject = mongoose.model("UserModelProject", UserSchema);

    var api ={
        Create: Create,
        FindAll: FindAll,
        findById: findById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function findUserByUsername(username){
        var deferred = q.defer();

        UserModelProject.findOne({"username": username}, function(err, user){
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

        UserModelProject.findOne({"username": credentials.username, "password": credentials.password, "status": "ACTIVE"}, function(err, user){
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
        user.status = "ACTIVE";
        user.profilePicture = "https://lh3.googleusercontent.com/-yJIlCzdSKv8/AAAAAAAAAAI/AAAAAAAAAAA/eQh2S1I6JsM/s120-c/photo.jpg";
        user.type = "REGULAR";
        user.firstName = "";
        user.lastName = "";

        UserModelProject.create(user, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                UserModelProject.findOne({"_id": newUserId}, function(err, user){
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

        UserModelProject.find(function(err, users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function findById(userId){
        var deferred = q.defer();

        UserModelProject.findOne({"_id": userId}, function(err, user){
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

        delete user._id;

        UserModelProject.update({"_id": userId}, {$set: user}, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function Delete(userId){
        var deferred = q.defer();

        UserModelProject.remove({"_id": userId}, function(err, response){
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