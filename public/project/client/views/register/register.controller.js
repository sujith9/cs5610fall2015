(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService, $location){
        var model = this;
        model.register = register;

        function register(username, password, email){
            var newUserTemp = {"username": username, "password": password, "email": email};
            UserService.createUser(newUserTemp).then(function(response){
                if(response !== null || response != undefined) {
                    $rootScope.user = response;
                    model.user = response;
                    $location.path("/profile");
                }
            });
        }
    }
}());