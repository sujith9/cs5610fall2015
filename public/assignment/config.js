(function(){

    "use strict";
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "client/views/home/home.view.html"
                })
                .when("/register", {
                    templateUrl: "client/views/register/register.view.html",
                    controlller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "client/views/profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "admin.html"
                })
                .when("/form", {
                    templateUrl: "client/views/form/form.view.html",
                    controller: "FormController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
