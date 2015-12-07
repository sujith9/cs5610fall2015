"use strict";

module.exports = function(app, ReviewModel){

    // Create new review for page
    app.post('/api/project/destination/review/', function (req, res) {
        var newReview = req.body;
        ReviewModel.createReview(newReview).then(function(reviews){
            res.json(reviews);
        });
    });

    // Find review for page
    app.get('/api/project/destination/review/:title/:pageId', function (req, res) {
        var title = req.params.title;
        var pageId = req.params.pageId;
        ReviewModel.findReviewsForPage({title: title, pageId: pageId}).then(function(reviews){
            for(var i = 0; i < reviews.length; i++) {
                reviews[i].userId.password = null;
                reviews[i].userId.firstName = null;
                reviews[i].userId.lastName = null;
                reviews[i].userId.email = null;
            }
            res.json(reviews);
        });
    });
};