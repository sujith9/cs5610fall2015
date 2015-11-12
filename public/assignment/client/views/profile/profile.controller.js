(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $rootScope){

        var currentUser = $rootScope.user;
        var userId = currentUser.id;

        $scope.username = currentUser.username;
        $scope.password = currentUser.password;
        $scope.firstname = currentUser.firstname;
        $scope.lastname = currentUser.lastname;
        $scope.email = currentUser.email;

        $scope.update = update;

        function update(){
            var updatedUser = {id: userId, username: $scope.username,
                password: $scope.password,
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email
            };

            $rootScope.user = UserService.updateUser(userId, updatedUser, "TO-DO");
        }
    }
})();