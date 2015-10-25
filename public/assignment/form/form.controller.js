(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService){
        var userId = $rootScope.user.id;
        $scope.forms = FormService.findAllFormsForUser(userId, "TO-DO");

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        function addForm(){
            FormService.createFormForUser(userId, {name: $scope.form.name}, "TO-DO");

            $scope.forms = FormService.findAllFormsForUser(userId, "TO-DO");
        }

         function updateForm(){
            //$scope.forms[$scope.selectedFormIndex].name = form.name;

            var formId = $scope.forms[$scope.selectedFormIndex].id;


            FormService.updateFormById(formId, $scope.form, "TO-DO");
            $scope.forms = FormService.findAllFormsForUser(userId, "TO-DO");

        }

         function deleteForm(index){
            var formId = $scope.forms[index].id;
            $scope.forms = FormService.deleteFormById(formId, "TO-DO");
        }

         function selectForm(index){
            $scope.selectedFormIndex = index;

            $scope.form = {
                id: $scope.forms[index].id,
                name: $scope.forms[index].name,
                userid: $scope.forms[index].userid
            };
        }
    }
})();