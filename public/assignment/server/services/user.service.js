"use strict";

module.exports = function(app, userModel){

    app.get('/api/assignment/user', function(req, res){
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
    app.post('/api/assignment/user', function (req, res) {
        var newUser = req.body;
        userModel.Create(newUser).then(function(user){
            res.json(user);
        });
    });

    app.get('/api/assignment/user/:id', function(req, res){
        var id = req.params.id;
        userModel.FindById(id).then(function(user){
            res.json(user);
        });
    });

    app.put('/api/assignment/user/:id', function (req, res) {
        var id = req.params.id;
        var newUser = req.body;
        userModel.Update(id, newUser).then(function(user){
            res.json(user);
        });
    });

    app.delete('/api/assignment/user/:id', function(req, res){
        var id = req.params.id;
        userModel.Delete(id).then(function(users){
            res.json(users);
        });
    });
};