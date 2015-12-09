(function(){
    "use strict";

    angular
        .module("BackpackBuddyApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope){

        var model = this;

        model.update = update;
        model.user = $rootScope.user;
        var userId = model.user._id;


        function update(user){
            var updatedUser = {_id: userId,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                type: user.type,
                status: user.status,
                profilePicture: user.profilePicture,
                about: user.about
            };

            UserService.updateUser(userId, updatedUser).then(function(response){
                console.log(response);
                $rootScope.user = response;
            });
        }
    }
})();