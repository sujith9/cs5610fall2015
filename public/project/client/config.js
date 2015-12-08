(function(){

    "use strict";
    angular
        .module("BackpackBuddyApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "client/views/home/home.view.html"
                })
                .when("/search/:query", {
                    templateUrl: "client/views/search/search.view.html",
                    controller: "SearchController as model"
                })
                .when("/destination/:destination/", {
                    templateUrl: "client/views/destination/destination.view.html",
                    controller: "DestinationController as model"
                })
                .when("/profile", {
                    templateUrl: "client/views/profile/profile.view.html",
                    controller: "ProfileController as model",
                    //resolve: {
                    //    loggedin: checkCurrentUser
                    //}

                })
                .when("/timeline/:userId", {
                    templateUrl: "client/views/timeline/timeline.view.html",
                    controller: "TimelineController as model"
                })
                .when("/login", {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController as model"
                })
                .when("/register", {
                    templateUrl: "client/views/register/register.view.html",
                    controller: "RegisterController as model"
                })
                .when("/logout", {
                    controller: "LogoutController as model"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

    //var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
    //    var deferred = $q.defer();
    //
    //    $http.get("/api/loggedin")
    //        .success(function (user) {
    //            console.log(user);
    //            // User is Authenticated
    //            if (user !== '0') {
    //                $rootScope.user = user;
    //            } else {
    //                delete $rootScope.user;
    //            }
    //            deferred.resolve();
    //        });
    //
    //    return deferred.promise;
    //};

})();