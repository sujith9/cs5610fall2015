(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope){

        var loginModel = this;
        loginModel.login = login;
        $scope.test = "Hello from Login";

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