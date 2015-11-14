"use strict";
var forms = require("./form.mock.json");
var uuid = require('uuid');

module.exports = function(){


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
        var form = null;
        var len = forms.length;
        for(var i = 0; i < len; i++){
            if(forms[i]['title'] == title){
                form = forms[i];
                break
            }
        }

        return form;
    }

    function Create(userId, form){
        form['userId'] = userId;
        form['id'] = uuid.v1();
        forms.push(form);
        return forms;
    }

    function FindAll(){
        return forms;
    }

    function FindById(id){
        var form = null;
        var len = forms.length;
        for(var i = 0; i < len; i++){
            if(forms[i]['id'] == id){
                form = forms[i];
                break
            }
        }

        return form;
    }

    function Update(formId, form){
        var len = forms.length;

        for(var i = 0; i < len; i++){
            if(forms[i]["id"] == formId){
                form["id"] = formId;
                form["userId"] = forms[i]["userId"];
                forms[i] = form;
                return forms[i];
            }
        }
    }

    function Delete(formId){
        var len = forms.length;

        for(var i = 0; i < len; i++){
            if(forms[i]["id"] == formId){
                var userId = forms[i]['userId'];
                forms.splice(i, 1);
                break;
            }
        }
        return findFormsForUser(userId);
    }

    function findFormsForUser(userId){
        var formsForUser = [];
        var len = forms.length;

        for(var i = 0; i < len; i++){
            if(forms[i]["userId"] == userId){
                formsForUser.push(forms[i])
            }
        }

        return formsForUser;
    }

    function findFieldsForForm(formId){
        var form = FindById(formId);
        return form['fields'];

    }

    function findFieldById(formId, fieldId){
        var form = FindById(formId);

        var fields = form['fields'];
        var field = null;

        for(var i = 0; i < fields.length; i++){
            if(fields[i]["id"] == fieldId){
                 field = fields[i];
                break
            }
        }

        return field;
    }


    function removeFieldById(formId, fieldId) {
        var fields = null;
        for(var i = 0; i < forms.length; i++){
            if(forms[i]["id"] == formId){
                for (var j = 0; j < forms[i]["fields"].length; j++){
                    if(forms[i]["fields"][j]["id"] == fieldId){
                        forms[i]["fields"][j].splice(j, 1);
                        fields = forms[i]["fields"];
                        break
                    }
                }
                break
            }
        }

        return fields;

    }

    function addNewFieldForForm(formId, newForm){
        for(var i = 0; i < forms.length; i++){
            if(forms[i]["id"] == formId){
                forms[i]["fields"].push(newForm);
                return forms[i]["fields"]
            }
        }
    }

    function updateFieldById(formId, fieldId, newField){
        var field = null;
        for(var i = 0; i < forms.length; i++){
            if(forms[i]["id"] == formId){
                for (var j = 0; j < forms[i]["fields"].length; j++){
                    if(forms[i]["fields"][j]["id"] == fieldId){
                        newField["id"] = forms[i]["fields"][j]["id"];
                        forms[i]["fields"][j] = newField;
                        field = forms[i]["fields"][j];
                        break
                    }
                }
                break
            }
        }

        return field;
    }

};