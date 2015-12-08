module.exports = function(mongoose){
    var Schema = mongoose.Schema;

    var FollowSchema = mongoose.Schema({
        userId: {type : Schema.ObjectId, ref : 'UserModelProject'},
        followUser: {type : Schema.ObjectId, ref : 'UserModelProject'}
    }, {collection: "cs5610.project.follow"});

    return FollowSchema;
};