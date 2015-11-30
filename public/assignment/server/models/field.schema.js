module.exports = function(mongoose){

    var FieldSchema = mongoose.Schema({
        label: String,
        "type": {
            type: String,
            enum: ["TEXT", "TEXTAREA", "RADIOS", "CHECKBOXES", "SELECT", "DATE", "OPTIONS"]
        },
        options: [{
            label: String,
            value: String
        }],
        placeholder: String
    });

    return FieldSchema;
};