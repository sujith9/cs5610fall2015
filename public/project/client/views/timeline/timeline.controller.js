(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("TimelineController", TimelineController);

    function TimelineController($rootScope, $routeParams, UserService, BookmarkService, VisitService, FollowService){
        var model = this;
        var userId = $routeParams.userId;
        loadUserDetails(userId);
        loadUserBookmarks(userId);
        loadUserVisits(userId);
        findIfFollows(userId);
        loadAllFollowingUsers(userId);
        loadAllUpdatesForUser(userId);

        model.unfollowUser = unfollowUser;
        model.followUser = followUser;

        function loadUserDetails(userId){
            UserService.findUserById(userId).then(function(user){
                model.timelineUser = user;
            });

        }

        function loadUserBookmarks(userId){
            BookmarkService.getBookmarksForUser(userId).then(function(bookmarks){
                model.timelineUserBookmarks = bookmarks;
            });

        }

        function loadUserVisits(userId){
            VisitService.getVisitsForUser(userId).then(function(visits){
                model.timelineUserVisits = visits;
            });
        }

        function unfollowUser(followId){
            if($rootScope.user != null && $rootScope.user != undefined){
                FollowService.unfollowUser(followId).then(function(response){
                    model.followObject = response;
                    model.follows = false;
                });
            }
        }

        function followUser(userId){
            if($rootScope.user != null && $rootScope.user != undefined){
                FollowService.followUser($rootScope.user._id, userId).then(function(response){
                    model.followObject = response;
                    model.follows = true;
                });
            }
            else{
                alert("Please login.")
            }
        }

        function findIfFollows(userId){
            if($rootScope.user != null && $rootScope.user != undefined){
                FollowService.findIfFollowing($rootScope.user._id, userId).then(function(response){
                        if(response != null) {
                            model.followObject = response;
                            model.follows = true;
                        }
                        else{
                            model.followObject = null;
                            model.follows = false;
                        }
                    });
            }
            else{
                model.followObject = null;
                model.follows = false;
            }
        }

        function loadAllFollowingUsers(userId){
            FollowService.findAllFollowingUsers(userId).then(function(followObjects){
                model.timelineUserFollows = followObjects;
            });
        }

        function loadAllUpdatesForUser(userId){
            FollowService.getUpdatesForUser(userId).then(function(response){
                model.updatesForUser = response;
            })
        }
    }
})();