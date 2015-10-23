(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService)

    function FormService(){
        var forms = [];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback){
            form["id"] = guid();
            form["userid"] = userId;

            forms.push(form);

            return form
        }

        function findAllFormsForUser(userId, callback){
            var formsForUser = [];
            var len = forms.length;

            for(var i = 0; i < len; i++){
                if(forms[i]["userid"] == userId){
                    formsForUser.push(forms[i])
                }
            }

            return formsForUser;
        }

        function deleteFormById(formId, callback){
            var len = forms.length;

            for(var i = 0; i < len; i++){
                if(forms[i]["id"] == formId){
                    forms.splice(i, 1);
                }
            }

            return forms;
        }

        function updateFormById(formId, newForm, callback){
            var len = forms.length;

            for(var i = 0; i < len; i++){
                if(forms[i]["id"] == formId){
                    newForm["userid"] = forms[i]["userid"]
                    forms[i] = newForm;
                }
            }
            return newForm;
        }

        // Using the implementation provided by Prof. Jose on Piazza
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();