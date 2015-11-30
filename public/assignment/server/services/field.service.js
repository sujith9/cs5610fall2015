"use strict";

module.exports = function(app, model){

    app.get('/api/assignment/form/:formId/field', function(req, res){
        var formId = req.params.formId;
        model.findFieldsForForm(formId).then(function(fields){
            res.json(fields);
        });
    });

    app.get('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        model.findFieldById(formId, fieldId).then(function(field){
            res.json(field);
        });
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        model.removeFieldById(formId, fieldId).then(function(fields){
            res.json(fields);
        });
    });

    app.post('/api/assignment/form/:formId/field', function (req, res) {
        var formId = req.params.formId;
        var newField = req.body;

        model.addNewFieldForForm(formId, newField).then(function(fields){
            res.json(fields);
        });
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;

        model.updateFieldById(formId, fieldId, newField).then(function(field){
            res.json(field);
        });
    });

};