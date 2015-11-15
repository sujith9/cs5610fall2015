(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q){

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/user/"+ userId +"/form";

            $http.post(url, form)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findAllFormsForUser(userId){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/user/"+ userId +"/form";
            $http.get(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteFormById(formId){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/form/" + formId;

            $http.delete(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateFormById(formId, newForm){
            var deferred = $q.defer();
            var url = "http://localhost:3000/api/assignment/form/" + formId;

            $http.put(url, newForm)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();