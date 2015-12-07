module.exports = function(mongoose){
    var Schema = mongoose.Schema;

    var VisitSchema = mongoose.Schema({
        userId: {type : Schema.ObjectId, ref : 'UserModelProject'},
        title: String,
        pageId: String,
        datePosted: { type: Date, default: Date.now },
        dateVisiting: {type: Date}

    }, {collection: "cs5610.project.visit"});

    return VisitSchema;
};