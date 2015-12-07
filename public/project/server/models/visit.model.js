"use strict";
var q = require("q");

module.exports = function(db, mongoose) {

    var VisitSchema = require("./visit.schema.js")(mongoose);
    var VisitModel = mongoose.model("VisitModel", VisitSchema);

    var api ={
        createVisit: createVisit,
        findVisitsForPage: findVisitsForPage,
        findVisitsForUser: findVisitsForUser
    };

    return api;

    function createVisit(VisitObject){
        var deferred = q.defer();

        VisitModel.create(VisitObject, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                findVisitsForPage(VisitObject).then(function(response){
                    deferred.resolve(response);
                });
            }
        });

        return deferred.promise;
    }

    function findVisitsForPage(SearchObject){
        var deferred = q.defer();

        VisitModel
            .find({title: SearchObject.title, pageId: SearchObject.pageId})
            .populate('userId')
            .exec(function(err, reviews){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(reviews);
                }
            });

        return deferred.promise;
    }

    function findVisitsForUser(userId){
        var deferred = q.defer();

        VisitModel.find({userId: userId}, function(err, visits){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(visits);
                }
            });

        return deferred.promise;

    }
};