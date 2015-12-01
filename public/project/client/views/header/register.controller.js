(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, UserService, $location){
        var registerModel = this;
        registerModel.register = register;

        function register(username, password, email){
            var newUserTemp = {"username": username, "password": password, "email": email};
            UserService.createUser(newUserTemp).then(function(response){
                if(response !== null || response != undefined) {
                    $rootScope.user = response;
                    registerModel.user = response;
                    $location.path("/profile");
                }
            });
        }
    }
}());