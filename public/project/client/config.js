(function(){

    "use strict";
    angular
        .module("BackpackBuddyApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "client/views/home/home.view.html",
                    controller: "SearchController as model"
                })
                .when("/destination/:destination/", {
                    templateUrl: "client/views/destination/destination.view.html",
                    controller: "DestinationController as model"
                })
                .when("/profile", {
                    templateUrl: "client/views/profile/profile.view.html",
                    controller: "ProfileController as model"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();