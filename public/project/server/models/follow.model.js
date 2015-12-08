"use strict";
var q = require("q");

module.exports = function(db, mongoose) {

    var FollowSchema = require("./follow.schema.js")(mongoose);
    var FollowModel = mongoose.model("FollowModel", FollowSchema);

    var api ={
        createFollow: createFollow,
        findFollowForUser: findFollowForUser,
        removeFollowForUser: removeFollowForUser,
        findAllFollowsForUser: findAllFollowsForUser
    };

    return api;

    function createFollow(followObject){
        var deferred = q.defer();

        FollowModel.update({userId: followObject.userId, followUser: followObject.followUser},{$setOnInsert: followObject},{upsert: true}, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                FollowModel.findOne(followObject, function(err, follow){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(follow);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findFollowForUser(followObject){
        var deferred = q.defer();

        FollowModel.findOne({userId: followObject.userId, followUser: followObject.followUser}, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });

        return deferred.promise;
    }

    function removeFollowForUser(followId){
        var deferred = q.defer();

        FollowModel.remove({_id: followId}, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });

        return deferred.promise;
    }

    function findAllFollowsForUser(userId){
        var deferred = q.defer();

        FollowModel.find({userId: userId})
            .populate('followUser')
            .exec(function(err, response){
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