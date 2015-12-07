
module.exports = function(app, db, mongoose, passport, LocalStrategy) {

    var userModelProject = require("./models/user.model.js")(db, mongoose, passport, LocalStrategy);
    require("./services/user.service.js")(app, userModelProject, mongoose, passport, LocalStrategy);

    var BookmarkModel = require("./models/bookmark.model.js")(db, mongoose);
    require("./services/bookmark.service.js")(app, BookmarkModel);

    var ReviewModel = require("./models/review.model.js")(db, mongoose);
    require("./services/review.service.js")(app, ReviewModel);

    var VisitModel = require("./models/visit.model.js")(db, mongoose);
    require("./services/visit.service.js")(app, VisitModel);
};