"use strict";

var model = require("../models/user.model.js")();

module.exports = function(app){

    app.get('/api/assignment/user', function(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if (username != null && password == null) {
            var user = model.findUserByUsername(username);
            res.json(user);
        }
        else if (username != null && password != null){
            var user = model.findUserByCredentials({'username':username, 'password':password})
            res.json(user);
        }
        else {
            var users = model.FindAll();
            res.json(users);
        }
    });


    app.post('/api/assignment/user', function (req, res) {
        var newUser = req.body;
        var users = model.Create(newUser);
        res.json(users);
    });

    app.get('/api/assignment/user/:id', function(req, res){
        var id = req.params.id;
        var user = model.FindById(id);
        res.json(user);
    });

    app.put('/api/assignment/user/:id', function (req, res) {
        var id = req.params.id;
        var newUser = req.body;
        var users = model.Update(id, newUser);
        res.json(users);
    });

    app.delete('/api/assignment/user/:id', function(req, res){
        var id = req.params.id;
        var users = model.Delete(id);
        res.json(users);
    });

};
