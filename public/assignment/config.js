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
                    controller: "RegisterController as registerModel"
                })
                .when("/login", {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController as loginModel"
                })
                .when("/profile", {
                    templateUrl: "client/views/profile/profile.view.html",
                    controller: "ProfileController as profileModel"
                })
                .when("/admin", {
                    templateUrl: "admin.html"
                })
                .when("/form", {
                    templateUrl: "client/views/form/form.view.html",
                    controller: "FormController as formModel"
                })
                .when("/user/:userId/form/:formId/fields", {
                    templateUrl: "client/views/field/field.view.html",
                    controller: "FieldController as model"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();