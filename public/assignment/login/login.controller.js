(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location){

        $scope.login = function(){
            var user = UserService.findUserByUsernameAndPassword($scope.username, $scope.password, "adsfadsf");

            if(user !== null){
                alert(user.username);
            }
            else{
                alert("No user.")
            }
        };

    }
})();