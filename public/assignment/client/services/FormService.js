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
            updateFormById: updateFormById,
            findFormByIdForUser: findFormByIdForUser
        };

        return service;

        function createFormForUser(userId, form){
            var deferred = $q.defer();
            var url = "/api/assignment/user/"+ userId +"/form";

            $http.post(url, form)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findAllFormsForUser(userId){
            var deferred = $q.defer();
            var url = "/api/assignment/user/"+ userId +"/form";
            $http.get(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteFormById(formId){
            var deferred = $q.defer();
            var url = "/api/assignment/form/" + formId;

            $http.delete(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateFormById(formId, newForm){
            var deferred = $q.defer();
            var url = "/api/assignment/form/" + formId;

            $http.put(url, newForm)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findFormByIdForUser(formId){
            var deferred = $q.defer();
            var url = "/api/assignment/form/"+ formId;

            $http.get(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();