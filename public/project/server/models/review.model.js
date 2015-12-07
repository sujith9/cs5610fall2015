"use strict";
var q = require("q");

module.exports = function(db, mongoose) {

    var ReviewSchema = require("./review.schema.js")(mongoose);
    var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

    var api ={
        createReview: createReview,
        findReviewsForPage: findReviewsForPage
    };

    return api;

    function createReview(ReviewObject){
        var deferred = q.defer();

        ReviewModel.create(ReviewObject, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                findReviewsForPage(ReviewObject).then(function(response){
                    deferred.resolve(response);
                });
            }
        });

        return deferred.promise;
    }

    function findReviewsForPage(SearchObject){
        var deferred = q.defer();

        ReviewModel
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
};