module.exports = function(mongoose){
    var Schema = mongoose.Schema;

    var ReviewSchema = mongoose.Schema({
        userId: {type : Schema.ObjectId, ref : 'UserModelProject'},
        title: String,
        pageId: String,
        reviewDate: { type: Date, default: Date.now },
        content: String

    }, {collection: "cs5610.project.review"});

    return ReviewSchema;
};