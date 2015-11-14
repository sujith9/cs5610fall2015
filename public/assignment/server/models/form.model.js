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
        findFormsForUser: findFormsForUser
    };

    return api;

    function findFormByTitle(title){
        var form = null;
        var len = forms.length;
        for(var i = 0; i < len; i++){
            if(forms[i]['title'] == title){
                form = forms[i];
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
            }
        }

        return form;
    }

    function Update(formId, form){
        var len = forms.length;

        for(var i = 0; i < len; i++){
            if(forms[i]["id"] == formId){
                forms[i] = form;

                return forms[i];
            }
        }
    }

    function Delete(formId){
        var len = forms.length;

        for(var i = 0; i < len; i++){
            if(forms[i]["id"] == formId){
                forms.splice(i, 1);
                break;
            }
        }
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

};