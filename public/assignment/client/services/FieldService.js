(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);


    function FieldService($http, $q){
        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };

        return service;

        function createFieldForForm(formId, field){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/form/" + formId +"/field";

            $http.post(url, field)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getFieldsForForm(formId){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/form/"+ formId +"/field";
            $http.get(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/form/"+ formId +"/field/"+ fieldId;
            $http.get(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/form/"+ formId +"/field/"+ fieldId;

            $http.delete(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateField(formId, fieldId, field){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/form/"+ formId +"/field/"+ fieldId;

            $http.put(url, field)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

    }
});