(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService, $location){
        var registerModel = this;
        registerModel.register = register;

        function register(username, password, email){
            var newUserTemp = {"username": username, "password": password, "email": email};
            UserService.createUser(newUserTemp).then(function(response){
                alert(response);
                if(response !== null || response != undefined) {
                    $rootScope.user = response;
                    registerModel.user = response;
                    $location.path("/profile");
                }
            });
        }

    }
}());