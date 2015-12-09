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
                        loggedin: RedirectToPageIfLoggedIn
                    }

                })
                .when("/timeline/:userId", {
                    templateUrl: "client/views/timeline/timeline.view.html",
                    controller: "TimelineController as model",
                    //resolve: {
                    //    loggedin: RedirectToPageIfLoggedIn
                    //}
                })
                .when("/admin", {
                    templateUrl: "client/views/admin/admin.view.html",
                    controller: "AdminController as model",
                    resolve: {
                        loggedin: RedirectToPageIfLoggedIn
                    }
                })
                .when("/login", {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController as model",
                    resolve: {
                        loggedin: RedirectToHomePageIfLoggedIn
                    }
                })
                .when("/register", {
                    templateUrl: "client/views/register/register.view.html",
                    controller: "RegisterController as model",
                    resolve: {
                        loggedin: RedirectToHomePageIfLoggedIn
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
                    $rootScope.user = loggedInUser;
                }
                else {
                    $rootScope.user = null;
                    $rootScope.errorMessage = 'Please log in to continue.';
                    console.log($rootScope.errorMessage);
                    //$location.url('/login');
                }

            });
    };

    function logout(UserService, $rootScope, $location, $q) {
        UserService
            .logout()
            .then(function (loggedInUser) {
                $rootScope.user = null;
                $location.url('/home');
            });
    }

    //
    function RedirectToHomePageIfLoggedIn(UserService, $rootScope, $location) {
        UserService
            .findIfUserLoggedIn()
            .then(function (loggedInUser) {
                if (loggedInUser !== '0') {
                    $rootScope.user = loggedInUser;
                    $location.url('/home');
                }
                else {
                    $rootScope.user = null;
                    $rootScope.errorMessage = 'Please log in to continue.';
                }

            });
    }

    function RedirectToPageIfLoggedIn(UserService, $rootScope, $location) {
        UserService
            .findIfUserLoggedIn()
            .then(function (loggedInUser) {
                if (loggedInUser !== '0') {
                    $rootScope.user = loggedInUser;
                }
                else {
                    $rootScope.user = null;
                    $rootScope.errorMessage = 'Please log in to continue.';
                    $location.url('/login');
                }

            });
    }

})();