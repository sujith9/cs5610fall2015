(function(){

    "use strict"
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "home.html"
                })
                .when("/register", {
                    templateUrl: "register.html"
                })
                .when("/login", {
                    templateUrl: "login.html"
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
                    redirectTo: "/"
                });
        });
})();
