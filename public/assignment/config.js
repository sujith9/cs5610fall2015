(function(){

    "use strict";
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "home.html"
                })
                .when("/register", {
                    templateUrl: "register.html"
                })
                .when("/login", {
                    templateUrl: "login/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "profile.html"
                })
                .when("/admin", {
                    templateUrl: "admin.html"
                })
                .when("/forms", {
                    templateUrl: "forms.html"
                })
                .otherwise({
                    redirectTo: "home"
                });
        });
})();
