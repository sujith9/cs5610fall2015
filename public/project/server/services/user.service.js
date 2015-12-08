"use strict";

module.exports = function(app, userModel, mongoose, passport, LocalStrategy){

    //var UserModelForPassport = require('mongoose').model("UserModelProject");
    //
    //
    //passport.use(new LocalStrategy(
    //    function(username, password, done)
    //    {
    //        UserModelForPassport.findOne({username: username, password: password}, function(err, user)
    //        {
    //            if (err) { return done(err); }
    //            if (!user) { return done(null, false); }
    //            return done(null, user);
    //        })
    //    }));
    //
    //passport.serializeUser(function(user, done)
    //{
    //    done(null, user);
    //});
    //
    //passport.deserializeUser(function(user, done)
    //{
    //    userModel.findById(user._id, function(err, user)
    //    {
    //        done(err, user);
    //    });
    //});
    //
    //app.post("/api/login", passport.authenticate('local'), function(req, res)
    //{
    //    var user = req.user;
    //    res.json(user);
    //});
    //
    //app.get('/api/loggedin', function(req, res)
    //{
    //    res.send(req.isAuthenticated() ? req.user : '0');
    //});
    //
    //app.post('/api/logout', function(req, res)
    //{
    //    req.logOut();
    //    res.send(200);
    //});
    //
    //app.post('/api/register', function(req, res)
    //{
    //    var newUser = req.body;
    //    UserModelForPassport.findOne({username: newUser.username}, function(err, user)
    //    {
    //        if(err) { return next(err); }
    //        if(user)
    //        {
    //            res.json(null);
    //            return;
    //        }
    //        var newUser = new UserModelForPassport(req.body);
    //        newUser.save(function(err, user)
    //        {
    //            req.login(user, function(err)
    //            {
    //                if(err) { return next(err); }
    //                res.json(user);
    //            });
    //        });
    //    });
    //});

    app.get('/api/project/user', function(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if (username != null && password == null) {
            userModel.findUserByUsername(username).then(function(user){
                res.json(user);
            });
        }
        else if (username != null && password != null){
            userModel.findUserByCredentials({'username':username, 'password':password}).then(function(user){
                res.json(user);
            });
        }
        else {
            userModel.FindAll().then(function(users){
                res.json(users);
            });
        }
    });

    // Create new user
    app.post('/api/project/user', function (req, res) {
        var newUser = req.body;
        userModel.Create(newUser).then(function(user){
            res.json(user);
        });
    });

    app.get('/api/project/user/:id', function(req, res){
        var id = req.params.id;
        userModel.findById(id).then(function(user){
            user.password = null;
            res.json(user);
        });
    });

    app.put('/api/project/user/:id', function (req, res) {
        var id = req.params.id;
        var newUser = req.body;
        userModel.Update(id, newUser).then(function(user){
            res.json(user);
        });
    });

    app.delete('/api/project/user/:id', function(req, res){
        var id = req.params.id;
        userModel.Delete(id).then(function(users){
            res.json(users);
        });
    });
};