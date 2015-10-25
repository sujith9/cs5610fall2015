(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService, $location){

        $scope.register = register;

        function register(){
            var newUserTemp = {username: $scope.username, password: $scope.password, email: $scope.email};
            var newUser = UserService.createUser(newUserTemp, "TO-DO");

            $rootScope.user = newUser;
            if(newUser !== null) {
                alert(newUser.id);
                $location.path("/profile");
            }
        }

    }
}());