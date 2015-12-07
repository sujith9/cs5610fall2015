module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        email: String,
        about: String,
        "type": {
            type: String,
            enum: ["ADMIN", "REGULAR"]
        },
        profilePicture: String,
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"]
        }

    }, {collection: "cs5610.project.user"});

    return UserSchema;
};