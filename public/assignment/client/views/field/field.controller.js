(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService){
        var model = this;
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;

        model.addField = addField;

        if(userId != null && formId != null){
            FieldService.getFieldsForForm(formId).then(function(response){
                model.fields = response;
            });
        }


        function addField(fieldType){
            var field = {};
            switch (fieldType){
                case "TEXT":
                    field = {"id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;

                case "TEXTAREA":
                    field = {"id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;

                case "DATE":
                    field = {"id": null, "label": "New Date Field", "type": "DATE"};
                    break;

                case "OPTIONS":
                    field = {"id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;

                case "CHECKBOXES":
                    field = {"id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;

                case "RADIOS":
                    field = {"id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;
            }
            FieldService.createFieldForForm(formId, field).then(function(response){
                model.fields = response;
            });
        }
    }
})();