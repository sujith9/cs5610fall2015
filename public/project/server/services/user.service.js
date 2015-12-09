"use strict";

module.exports = function(app, userModel, mongoose, passport, LocalStrategy){

    app.get("/api/project/user/loggedin", loggedin);
    app.get("/api/project/user/logout", logout);

    passport.use(new LocalStrategy(
        function (username, password, done) {
            var credentials = {
                "username": username,
                "password": password
            };
            userModel
                .findUserByCredentials(credentials)
                .then(function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                });
        }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    app.post("/api/project/user/login", passport.authenticate('local'), function (req, res) {
        var user = req.user;

        res.json(user);
    });

    function loggedin(req, res) {
        //var t = req.params.t;
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        //var t = req.params.t;
        req.logOut();
        res.send(200);
    }

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
                for(var i = 0; i < users.length; i++){
                    users[i].password = null;
                }
                res.json(users);
            });
        }
    });

    // Create new user
    app.post('/api/project/user', function (req, res) {
        var newUser = req.body;
        userModel.Create(newUser).then(function(user){
            if(user != null){
                req.login(user, function(err)
                {
                    if(err) { return next(err); }
                    res.json(user);
                });
            }
            else{
                res.json(user);
            }
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

    app.get('/api/project/user/:id/deactivate', function (req, res) {
        var id = req.params.id;
        if(req.user.type == 'ADMIN') {
            userModel.deactivateUser(id).then(function (user) {
                userModel.FindAll().then(function(users){
                    for(var i = 0; i < users.length; i++){
                        users[i].password = null;
                    }
                    res.json(users)
                })
            });
        }
    });

    app.get('/api/project/user/:id/activate', function (req, res) {
        var id = req.params.id;
        if(req.user.type == 'ADMIN') {
            userModel.activateUser(id).then(function (user) {
                userModel.FindAll().then(function(users){
                    for(var i = 0; i < users.length; i++){
                        users[i].password = null;
                    }
                    res.json(users)
                })
            });
        }
    });

};