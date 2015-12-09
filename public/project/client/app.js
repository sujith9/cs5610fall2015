(function(){

    "use strict";

    angular
        .module("BackpackBuddyApp", ["ngRoute"])
        .run(ApplicationModuleMethod);

    function ApplicationModuleMethod($rootScope) {
        $rootScope.user = {};
        $rootScope.locationId;
    }
})();
