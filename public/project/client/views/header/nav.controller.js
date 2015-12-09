(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("NavbarController", NavbarController);

    function NavbarController($rootScope){

        var model = this;
        model.isUserAdmin = isUserAdmin;

        function isUserAdmin(){
            return ($rootScope.user != undefined
            && $rootScope.user.type != undefined
            && $rootScope.user.type.indexOf('ADMIN') > -1);
        }
    }
})();