(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope){

        var model = this;
        model.login = login;

        function login(username, password){

            var user = {username: username, password: password};

            UserService.login(user).then(function(response){
                model.user = response;
                if(model.user != null || model.user != undefined){
                    $rootScope.user = response;
                    $location.path("/profile")
                }
                else{
                    $scope.error = "Incorrect username or password.";
                }
            });
    }
}
})();