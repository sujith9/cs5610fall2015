(function(){

    "use strict";
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "home/home.view.html"
                })
                .when("/register", {
                    templateUrl: "register/register.view.html",
                    controlller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "login/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "admin.html"
                })
                .when("/form", {
                    templateUrl: "form/form.view.html",
                    controller: "FormController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
