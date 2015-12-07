"use strict";
var q = require("q");

module.exports = function(db, mongoose) {

    var BookmarkSchema = require("./bookmark.schema.js")(mongoose);
    var BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema);

    var api ={
        createBookmark: createBookmark,
        findBookMarkForUser: findBookMarkForUser,
        removeBookMarkForUser: removeBookMarkForUser,
        findAllBookmarksForUser: findAllBookmarksForUser
    };

    return api;

    function createBookmark(bookmarkObject){
        var deferred = q.defer();

        //var newBookmarkId = mongoose.Types.ObjectId();
        //bookmarkObject._id = newBookmarkId;

        BookmarkModel.update({userId: bookmarkObject.userId, pageId: bookmarkObject.pageId, title: bookmarkObject.title},{$setOnInsert: bookmarkObject},{upsert: true}, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                BookmarkModel.findOne(bookmarkObject, function(err, bookmark){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(bookmark);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findBookMarkForUser(bookmarkObject){
        var deferred = q.defer();

        BookmarkModel.findOne({userId: bookmarkObject.userId,
            title: bookmarkObject.title, pageId: bookmarkObject.pageId}, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });

        return deferred.promise;
    }

    function removeBookMarkForUser(bookmarkId){
        var deferred = q.defer();

        BookmarkModel.remove({_id: bookmarkId}, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });

        return deferred.promise;
    }

    function findAllBookmarksForUser(userId){
        var deferred = q.defer();

        BookmarkModel.find({userId: userId}, function(err, response){
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