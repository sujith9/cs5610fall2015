"use strict";

module.exports = function(app, VisitModel){

    // Create new visit for page
    app.post('/api/project/destination/visit/', function (req, res) {
        var newVisit = req.body;
        VisitModel.createVisit(newVisit).then(function(visits){
            res.json(visits);
        });
    });

    // Find visits for page
    app.get('/api/project/destination/visit/:title/:pageId', function (req, res) {
        var title = req.params.title;
        var pageId = req.params.pageId;
        VisitModel.findVisitsForPage({title: title, pageId: pageId}).then(function(visits){
            for(var i = 0; i < visits.length; i++) {
                visits[i].userId.password = null;
                visits[i].userId.firstName = null;
                visits[i].userId.lastName = null;
                visits[i].userId.email = null;
            }
            res.json(visits);
        });
    });

    // Find visits for user
    app.get('/api/project/visit/user/:userId', function (req, res) {
        var userId = req.params.userId;
        VisitModel.findVisitsForUser(userId).then(function(visits){
            res.json(visits);
        });
    });
};