(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("LogoutController", LogoutController);

    function LogoutController(UserService, $location, $rootScope){

        var model = this;
        model.logout = logout;

        logout();
        alert("logout");

        function logout(){
            UserService.logout().then(function(response){
                model.user = null;
                $rootScope.user = null;
                $location.url("#/home");
            });
        }
    }
})();