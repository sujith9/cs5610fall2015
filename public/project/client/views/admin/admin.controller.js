(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $rootScope){

        var model = this;

        var model = this;
        model.deactivateUser = deactivateUser;
        model.activateUser = activateUser;

        if ($rootScope.user != undefined && $rootScope.user != null && $rootScope.user.type == "ADMIN") {
            loadAllUsers();
        }

        function loadAllUsers() {
            UserService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

        function deactivateUser(userId) {
            UserService
                .deactivateUser(userId)
                .then(function (users) {
                    model.users = users
                });
        }

        function activateUser(userId) {
            UserService
                .activateUser(userId)
                .then(function (users) {
                    model.users = users
                });
        }
    }
})();