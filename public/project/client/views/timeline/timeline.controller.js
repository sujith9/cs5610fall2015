(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("TimelineController", TimelineController);

    function TimelineController($rootScope, $routeParams, UserService, BookmarkService, VisitService){
        var model = this;
        var userId = $routeParams.userId;
        loadUserDetails(userId);
        loadUserBookmarks(userId);
        loadUserVisits(userId);

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


    }
})();