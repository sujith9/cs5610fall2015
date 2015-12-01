"use strict";
//var forms = require("./form.mock.json");
//var uuid = require('uuid');
var q = require("q");

module.exports = function(db, mongoose){

    var FormSchema = require("./form.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,
        findFieldsForForm: findFieldsForForm,
        findFieldById: findFieldById,
        removeFieldById: removeFieldById,
        addNewFieldForForm: addNewFieldForForm,
        updateFieldById: updateFieldById
    };

    return api;

    function findFormByTitle(title){

        var deferred = q.defer();

        FormModel.findOne({"title": title}, function(err, form){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function Create(userId, form){
        form['userId'] = userId;
        form['fields'] = [];

        var deferred = q.defer();

        FormModel.create(form, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                FormModel.find({"userId": userId}, function(err, forms){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(forms);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function FindAll(){
        var deferred = q.defer();

        FormModel.find(function(err, form){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function FindById(id){
        var deferred = q.defer();

        FormModel.findOne({"_id": id}, function(err, form){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function Update(formId, form){
        var deferred = q.defer();
        var userId = form.userId;

        delete form._id;

        FormModel.update({"_id": formId}, {$set: form}, function(err, response){
            if(err){
                deferred.reject(err);
            }
            else{
                FormModel.find({"userId": userId}, function(err1, forms){
                    if(err1){
                        deferred.reject(err1);
                    }
                    else{
                        deferred.resolve(forms);
                    }
                });

            }
        });

        return deferred.promise;
    }

    function Delete(formId){
        var deferred = q.defer();
        var userId = null;
        FormModel.findOne({"_id": formId}, function(err, form){
            if(err){
                deferred.reject(err);
            }
            else{
                userId = form.userId;
                FormModel.remove({"_id": formId}, function(err, response){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        FormModel.find({"userId": userId}, function(err, forms){
                            if(err){
                                deferred.reject(err);
                            }
                            else{
                                deferred.resolve(forms);
                            }
                        });
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findFormsForUser(userId){
        var deferred = q.defer();

        FormModel.find({"userId": userId}, function(err, forms){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(forms);
            }
        });

        return deferred.promise;
    }

    function findFieldsForForm(formId){
        var deferred = q.defer();

        FormModel.findOne({"_id": formId}, function(err, form){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(form.fields);
            }
        });

        return deferred.promise;
    }

    function findFieldById(formId, fieldId){
        var deferred = q.defer();

        FormModel.findOne({"_id": formId}, function(err, form){
            if(err){
                deferred.reject(err);
            }
            else{
                var fieldFound = null;
                for(var field in form.fields){
                    if(fieldId == field["_id"]){
                        fieldFound = field;
                        break;
                    }
                }
                deferred.resolve(fieldFound);
            }
        });

        return deferred.promise;
    }


    function removeFieldById(formId, fieldId) {

        var deferred = q.defer();

        FormModel.findOne({"_id": formId}, function(err, form){
            if(err){
                deferred.reject(err);
            }
            else {
                for (var i = 0; i < form.fields.length; i++) {
                    if (form.fields[i]._id == fieldId) {
                        form.fields.splice(i, 1);

                        form.save(function (err, form) {
                            deferred.resolve(form.fields);
                        });
                    }
                }
            }
        });

        return deferred.promise;
    }

    function addNewFieldForForm(formId, newField){

        var deferred = q.defer();

        FormModel.findOne({"_id": formId}, function(err, form){
            if(err){
                deferred.reject(err);
            }
            else{
                var fieldId = mongoose.Types.ObjectId();
                newField["_id"] = fieldId;
                form.fields.push(newField);
                form.save(function (err, form) {
                    deferred.resolve(form.fields);
                });
            }
        });

        return deferred.promise;
    }

    function updateFieldById(formId, fieldId, newField){

        var deferred = q.defer();

        FormModel.find({"_id": formId}, function(err, form){
            if(err){
                deferred.reject(err);
            }
            else {
                for (var i = 0; i < form.fields.length; i++) {
                    if (form.fields[i]._id == fieldId) {
                        newField["_id"] = fieldId;
                        form.fields[i] = newField;

                        form.save(function (err, form) {
                            deferred.resolve(form.fields);
                        });
                    }
                }
            }
        });

        return deferred.promise;
    }
};