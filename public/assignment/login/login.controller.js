(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope){
        $scope.allUsers = UserService.findAllUsers("TO-DO");

        $scope.login = function(){
            var user = UserService.findUserByUsernameAndPassword($scope.username, $scope.password, "TO-DO");

            if(user !== null){
                $rootScope.user = user;
                $location.path("/profile")
            }
            else{
                $scope.error = "Incorrect username or password."
            }
        };

    }
})();