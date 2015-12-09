(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService, $location){
        var model = this;
        model.register = register;

        function register(username, password, email, password2){
            var newUserTemp = {"username": username, "password": password, "email": email};

            if(password != password2){
                model.error = "Passwords don't match.";
            }
            else {
                UserService.createUser(newUserTemp).then(function (response) {
                    if (response !== null || response != undefined) {
                        $rootScope.user = response;
                        model.user = response;
                        $location.path("/profile");
                    }
                    else {
                        model.error = "Username already exists. Please use a different username."
                    }
                });
            }
        }
    }
}());