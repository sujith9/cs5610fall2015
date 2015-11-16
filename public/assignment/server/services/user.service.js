"use strict";

module.exports = function(app, userModel){

    app.get('/api/assignment/user', function(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if (username != null && password == null) {
            var user = userModel.findUserByUsername(username);
            res.json(user);
        }
        else if (username != null && password != null){
            var user = userModel.findUserByCredentials({'username':username, 'password':password})
            res.json(user);
        }
        else {
            var users = userModel.FindAll();
            res.json(users);
        }
    });

    // Create new user
    app.post('/api/assignment/user', function (req, res) {
        var newUser = req.body;
        var user = userModel.Create(newUser);
        res.json(user);
    });

    app.get('/api/assignment/user/:id', function(req, res){
        var id = req.params.id;
        var user = userModel.FindById(id);
        res.json(user);
    });

    app.put('/api/assignment/user/:id', function (req, res) {
        var id = req.params.id;
        var newUser = req.body;
        var user = userModel.Update(id, newUser);
        res.json(user);
    });

    app.delete('/api/assignment/user/:id', function(req, res){
        var id = req.params.id;
        var users = userModel.Delete(id);
        res.json(users);
    });

};
