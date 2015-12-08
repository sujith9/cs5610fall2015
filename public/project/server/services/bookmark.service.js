"use strict";

module.exports = function(app, BookmarkModel){

    // Create new bookmark
    app.post('/api/project/user/bookmark/', function (req, res) {
        var newBookmark = req.body;
        BookmarkModel.createBookmark(newBookmark).then(function(bookmark){
            res.json(bookmark);
        });
    });

    // Find if page bookmarked by user
    app.get('/api/project/user/:userId/bookmark/:title/:pageId', function (req, res) {
        var userId = req.params.userId;
        var title = req.params.title;
        var pageId = req.params.pageId;
        console.log("From bookmark service "+title, pageId);
        BookmarkModel.findBookMarkForUser({userId: userId, title: title, pageId: pageId}).then(function(bookmark){
            console.log("From bookmark service after reply", bookmark);
            res.json(bookmark);
        });
    });

    // Remove bookmark for user
    app.delete('/api/project/bookmark/:bookmarkId', function (req, res) {
        var bookmarkId = req.params.bookmarkId;
        BookmarkModel.removeBookMarkForUser(bookmarkId).then(function(bookmark){
            res.json(bookmark);
        });
    });

    // Find bookmarks for user
    app.get('/api/project/bookmark/user/:userId', function (req, res) {
        var userId = req.params.userId;
        BookmarkModel.findAllBookmarksForUser(userId).then(function(bookmarks){
            res.json(bookmarks);
        });
    });
};