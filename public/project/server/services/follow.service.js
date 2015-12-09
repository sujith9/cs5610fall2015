"use strict";

module.exports = function(app, FollowModel, ReviewModel){

    // Create follow
    app.post('/api/project/follow/', function (req, res) {
        var newFollow = req.body;
        FollowModel.createFollow(newFollow).then(function(followObject){
            res.json(followObject);
        });
    });

    // Find if user followed by current user
    app.get('/api/project/follow/currentUser/:loggedInUserId/followUser/:followUserId', function (req, res){
        var loggedInUserId = req.params.loggedInUserId;
        var followUserId = req.params.followUserId;
        FollowModel.findFollowForUser({userId: loggedInUserId, followUser: followUserId}).then(function(followObject){
            res.json(followObject);
        });
    });

    // Unfollow user
    app.delete('/api/project/follow/:followId', function (req, res) {
        var followId = req.params.followId;
        FollowModel.removeFollowForUser(followId).then(function(response){
            res.json(response);
        });
    });

    // Find follow for user
    app.get('/api/project/follow/user/:userId', function (req, res) {
        var userId = req.params.userId;
        FollowModel.findAllFollowsForUser(userId).then(function(followObjects){
            for(var i = 0; i < followObjects.length; i++){
                followObjects[i].followUser.password = null;
            }
            res.json(followObjects);
        });
    });

    app.get('/api/project/update/user/:userId', function (req, res) {
        var userId = req.params.userId;
        FollowModel.findAllFollowsForUser(userId).then(function(followObjects){
            var userIds = [];
            for(var i = 0; i < followObjects.length; i++){
                userIds.push(followObjects[i].followUser._id)
            }

            ReviewModel.getReviewsForUsers(userIds).then(function(response){
                for(var j = 0; j < response.length; j++){
                    response[j].userId.password = null;
                    response[j].userId.email = null;
                }
                res.json(response);
            });

        });
    });
};