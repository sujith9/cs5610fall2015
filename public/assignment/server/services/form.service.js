"use strict";

var model = require("../models/form.model.js")();

module.exports = function(app){

    // Returns an array of forms belonging to a user whose id is passed
    app.get('/api/assignment/user/:userId/form', function(req, res){
        var userId = req.params.userId;
        var forms = model.findFormsForUser(userId);
        res.json(forms);
    });

    // Get form by form id
    app.get('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        var form = model.FindById(formId);
        res.json(form);
    });

    app.delete('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        model.Delete(formId);
    });

    app.post('/api/assignment/user/:userId/form', function (req, res) {
        var userId = req.params.userId;
        var newForm = req.body;
        model.Create(newForm);
        var forms = model.getFormsForUser(userId);
        res.json(forms);
    });

    app.put('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        var newForm = req.body;
        var form = model.Update(formId, newForm);
        res.json(form);
    });

};