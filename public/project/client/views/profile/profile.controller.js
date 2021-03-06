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
            if(user.profilePicture == '' || user.profilePicture == null){
                user.profilePicture = "https://lh3.googleusercontent.com/-yJIlCzdSKv8/AAAAAAAAAAI/AAAAAAAAAAA/eQh2S1I6JsM/s120-c/photo.jpg"
            }
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
                $rootScope.user = response;
            });
        }
    }
})();