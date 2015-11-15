(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $rootScope){

        var profileModel = this;

        profileModel.update = update;

        //var currentUser = $rootScope.user;
        //var userId = currentUser.id;

        profileModel.user = $rootScope.user;
        var userId = profileModel.user.id;
        //$scope.username = currentUser.username;
        //$scope.password = currentUser.password;
        //$scope.firstname = currentUser.firstname;
        //$scope.lastname = currentUser.lastname;
        //$scope.email = currentUser.email;


        function update(user){
            var updatedUser = {id: userId,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };

            $rootScope.user = UserService.updateUser(userId, updatedUser);
        }
    }
})();