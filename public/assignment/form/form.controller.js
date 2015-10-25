(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);


    function FormController($scope, $location, $rootScope, FormService){
        var userId = $rootScope.user.id;
        $scope.forms = FormService.findAllFormsForUser(userId, "TO-DO");

        $scope.addForm = function(){
            var form = FormService.createFormForUser(userId, {name: $scope.formname}, "TO-DO")

            $scope.forms = FormService.findAllFormsForUser(userId, "TO-DO");
            console.log($scope.forms);

        };

        $scope.updateForm = function(){
            alert("Hello from updateForm()");
        };
    }
})();