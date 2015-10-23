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

        }

        function findAllFormsForUser(userId, callback){

        }

        function deleteFormById(formId, callback){

        }

        function updateFormById(formId, newForm, callback){

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