(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("SearchController", SearchController)
        .filter('unsafe', function($sce) {
            return function(val) {
                return $sce.trustAsHtml(val);
            };
        });

    function SearchController(WikiService, $rootScope, $routeParams) {
        var model = this;
        model.error = null;

        var searchQuery = $routeParams.query;

        searchLocation(searchQuery);

        function searchLocation (location) {

            if(location != null && location != undefined && location.trim() != '') {
                WikiService.searchForLocation(location).then(function (response) {
                    model.error = null;
                    //Replacing '/' in title with '-'. Ex: Boston/Roxbury -> Boston-Roxbury
                    for (var i = 0; i < response.query.search.length; i++) {
                        response.query.search[i].title = response.query.search[i].title.replace("/", "-");
                    }
                    model.results = response;
                });
            }
            else{
                model.error = "Please enter to search...";
            }
        }
    }
})();