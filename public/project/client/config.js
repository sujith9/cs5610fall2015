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
                    resolve: {
                        loggedin: RedirectToRegularPageIfAlreadyLoggedInElseShowLoginPage
                    }

                })
                .when("/timeline/:userId", {
                    templateUrl: "client/views/timeline/timeline.view.html",
                    controller: "TimelineController as model"
                })
                .when("/login", {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController as model",
                    resolve: {
                        loggedin: RedirectToHomePageIfAlreadyLoggedInElseRespectivePage
                    }
                })
                .when("/register", {
                    templateUrl: "client/views/register/register.view.html",
                    controller: "RegisterController as model",
                    resolve: {
                        loggedin: RedirectToHomePageIfAlreadyLoggedInElseRespectivePage
                    }
                })
                .when("/logout", {
                    resolve: {
                        logout: logout
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });



    function findIfUserLoggedIn(UserService, $rootScope, $location) {
        UserService
            .findIfUserLoggedIn()
            .then(function (loggedInUser) {
                if (loggedInUser !== '0') {
                    console.log("config() you are already logged in " + loggedInUser.username);
                    $rootScope.user = loggedInUser;
                }
                else {
                    $rootScope.user = {};
                    $rootScope.errorMessage = 'You need to log in.';
                    console.log($rootScope.errorMessage);
                    //$location.url('/login');
                }

            });
    };

    function logout(UserService, $rootScope, $location, $q) {
        UserService
            .logout()
            .then(function (loggedInUser) {
                $rootScope.user = {};
                $location.url('/home');
            });
    }

    //
    function RedirectToHomePageIfAlreadyLoggedInElseRespectivePage(UserService, $rootScope, $location) {
        UserService
            .findIfUserLoggedIn()
            .then(function (loggedInUser) {
                if (loggedInUser !== '0') {
                    console.log("config() you are already logged in " + loggedInUser.username + loggedInUser._id);
                    $rootScope.user = loggedInUser;
                    $location.url('/home');
                }
                else {
                    $rootScope.user = {};
                    $rootScope.errorMessage = 'You need to log in.';
                    console.log($rootScope.errorMessage);
                    //$location.url('/profile');
                }

            });
    }

    function RedirectToRegularPageIfAlreadyLoggedInElseShowLoginPage(UserService, $rootScope, $location) {
        UserService
            .findIfUserLoggedIn()
            .then(function (loggedInUser) {
                if (loggedInUser !== '0') {
                    console.log("config() you are already logged in " + loggedInUser.username + loggedInUser._id);
                    $rootScope.user = loggedInUser;
                    //$location.url('/home');
                }
                else {
                    $rootScope.user = {};
                    $rootScope.errorMessage = 'You need to log in.';
                    console.log($rootScope.errorMessage);
                    $location.url('/login');
                }

            });
    }

})();