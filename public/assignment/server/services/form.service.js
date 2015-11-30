"use strict";

module.exports = function(app, model){

    // Returns an array of forms belonging to a user whose id is passed
    app.get('/api/assignment/user/:userId/form', function(req, res){
        var userId = req.params.userId;
        model.findFormsForUser(userId).then(function(forms){
            res.json(forms);
        });
    });

    // Get form by form id
    app.get('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        model.FindById(formId).then(function(form){
            res.json(form);
        });
    });

    app.delete('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        model.Delete(formId).then(function(forms){
            res.json(forms);
        });
    });

    app.post('/api/assignment/user/:userId/form', function (req, res) {
        var userId = req.params.userId;
        var newForm = req.body;
        model.Create(userId, newForm).then(function(form){
            res.json(form);
        });
    });

    app.put('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        var newForm = req.body;
        model.Update(formId, newForm).then(function(forms){
            res.json(forms);
        });
    });

};