(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("DestinationController", DestinationController)
        .filter('unsafe', function($sce) {
            return function(val) {
                return $sce.trustAsHtml(val);
            };
        });

    function DestinationController(WikiService, $routeParams, $location, BookmarkService, $rootScope, ReviewService, VisitService) {
        var model = this;
        var destination = $routeParams.destination;
        destination = destination.replace('-', '/');

        model.bookmarkPage = bookmarkPage;
        model.searchLocation = searchLocation;
        model.removeBookmarkForPage = removeBookmarkForPage;
        model.createReviewForPage = createReviewForPage;
        model.createVisit = createVisit;


        WikiService.getDestinationDetails(destination).then(function (response) {
            var find = '/wiki/';
            var re = new RegExp(find, 'g');
            var title = response.parse.title;
            var pageId = response.parse.pageid;
            response.parse.text["*"] = response.parse.text["*"].replace(re, '#/destination/');
            model.pageWikiURL = response.parse.title;
            response.parse.title = response.parse.title.replace('/', '-');
            model.destinationDetails = response;
            findIfBookmarked(response);
            getReviewsForPage(title, pageId);
            getPeopleVisiting(title, pageId);
        });

        function getReviewsForPage(title, pageId){
            ReviewService.findReviewsForDestination(title, pageId).then(function(response){
                model.reviews = response;
            });
        }

        function getPeopleVisiting(title, pageId){
            if($rootScope.user != null && $rootScope.user != undefined){
                VisitService.getPeopleVisitingPlace(title, pageId).then(function(response){
                    model.peopleVisiting = response;
                });
            }
        }

        //Check if page bookmarked
        function findIfBookmarked(page){
            if($rootScope.user != null && $rootScope.user != undefined){
                BookmarkService.findIfBookmarked($rootScope.user._id,
                    page.parse.title,
                    page.parse.pageid).then(function(response){
                        console.log(response);
                        if(response != null) {
                            model.bookmark = response;
                            model.bookmarked = true;
                        }
                        else{
                            model.bookmark = null;
                            model.bookmarked = false;
                        }
                    });
            }
            else{
                model.bookmark = null;
                model.bookmarked = false;
            }
        }

         function searchLocation (location) {
            WikiService.searchForLocation(location).then(function(response){
                model.results = response;
            });
         }

        function bookmarkPage(title, pageId, userId){
            if(userId != null && userId != undefined){
                BookmarkService.createBookmarkForUser(userId, title, pageId).then(function(response){
                    model.bookmark = response;
                    model.bookmarked = true;
                });
            }

        }

        function removeBookmarkForPage(bookmarkId){
            if(bookmarkId != null && bookmarkId != undefined){
                BookmarkService.removeBookmarkForUser(bookmarkId).then(function(response){
                    model.bookmark = response;
                    model.bookmarked = false;
                });
            }
        }

        function createReviewForPage(title, pageId, content){
            if($rootScope.user != null && $rootScope.user != undefined) {
                var newReview = {
                    userId: $rootScope.user._id, title: title, pageId: pageId,
                    content: content
                };

                ReviewService.createReviewForDestination(newReview).then(function(response){
                    model.reviews = response;
                })
            }
        }

        function createVisit(title, pageId, date){
            if($rootScope.user != null && $rootScope.user != undefined) {
                var newVisit = {
                    userId: $rootScope.user._id,
                    title: title,
                    pageId: pageId,
                    dateVisiting: date
                };

                VisitService.createVisitForUser(newVisit).then(function(response){
                    model.peopleVisiting = response;
                })
            }
        }
    }
})();