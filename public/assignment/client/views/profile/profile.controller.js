(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $rootScope){

        var profileModel = this;

        profileModel.update = update;
        profileModel.user = $rootScope.user;
        var userId = profileModel.user.id;


        function update(user){
            var updatedUser = {id: userId,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };

            UserService.updateUser(userId, updatedUser).then(function(response){
                profileModel.user = response;
                $rootScope.user = response;
            });
        }
    }
})();