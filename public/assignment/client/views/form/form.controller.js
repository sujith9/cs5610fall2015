(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService){
        var formModel = this;

        var userId = $rootScope.user.id;

        findFormsForUser(userId);

        formModel.addForm = addForm;
        formModel.updateForm = updateForm;
        formModel.deleteForm = deleteForm;
        formModel.selectForm = selectForm;


        function findFormsForUser(userId){
            FormService.findAllFormsForUser(userId).then(function(response){
                formModel.forms = response;
            });
        }


        function addForm(){
            FormService.createFormForUser(userId, formModel.form).then(function(response){
                formModel.forms = response;
            });
        }

         function updateForm(){
             var formId = formModel.forms[formModel.selectedFormIndex].id;
             FormService.updateFormById(formId, formModel.form).then(function(response){
                 formModel.forms = response;
                 console.log(response);
             });
        }

         function deleteForm(index){
             var formId = formModel.forms[index].id;
             alert(formId);

             FormService.deleteFormById(formId).then(function(response){
                 formModel.forms = response;
             });
        }

         function selectForm(index){
             formModel.selectedFormIndex = index;

             var tempForm = formModel.forms[index].constructor();

             for (var attr in formModel.forms[index]) {
                 if (formModel.forms[index].hasOwnProperty(attr)) tempForm[attr] = formModel.forms[index][attr];
             }

             formModel.form = tempForm;
        }
    }
})();