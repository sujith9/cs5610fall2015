(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope){

        var loginModel = this;
        loginModel.login = login;

        //$scope.allUsers = UserService.findAllUsers("TO-DO");

        function login(username, password){
            UserService.findUserByUsernameAndPassword(username, password).then(function(response){
                loginModel.user = response;
                if(loginModel.user != null || loginModel.user != undefined){
                    $rootScope.user = loginModel.user;
                    $location.path("/profile")
                }
                else{
                    $scope.error = "Incorrect username or password.";
                }
            });
        }

    }
})();