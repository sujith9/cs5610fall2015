module.exports = function(mongoose){

    var BookmarkSchema = mongoose.Schema({
        userId: String,
        title: String,
        pageId: String

    }, {collection: "cs5610.project.bookmark"});

    return BookmarkSchema;
};