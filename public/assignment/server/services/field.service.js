"use strict";

module.exports = function(app, model){

    app.get('/api/assignment/form/:formId/field', function(req, res){
        var formId = req.params.formId;
        var fields = model.findFieldsForForm(formId);
        res.json(fields);
    });

    app.get('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        var field = model.findFieldById(formId, fieldId);
        res.json(field);
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        var fields = model.removeFieldById(formId, fieldId);
        res.json(fields)
    });

    app.post('/api/assignment/form/:formId/field', function (req, res) {
        var formId = req.params.formId;
        var newField = req.body;

        var fields = model.addNewFieldForForm(formId, newField);
        res.json(fields);
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;

        var field = model.updateFieldById(formId, fieldId, newField);
        res.json(field);
    });

};