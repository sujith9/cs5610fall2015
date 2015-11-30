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

    function SearchController(WikiService) {
        var model = this;

        model.searchLocation = function (location) {
            WikiService.searchForLocation(location).then(function(response){
                //Replacing '/' in title with '-'. Ex: Boston/Roxbury -> Boston-Roxbury
                for(var i=0; i<response.query.search.length; i++){
                    response.query.search[i].title = response.query.search[i].title.replace("/","-");
                }
                model.results = response;
            });
        }
    }
})();