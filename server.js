var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({secret: 'this is the secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//mongoose.connect('mongodb://localhost/cs5610');
//var db = mongoose.connection;

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose, passport, LocalStrategy);


//require("./public/assignment/server/services/user.service.js")(app);
//require("./public/assignment/server/services/form.service.js")(app);

app.listen(port, ipaddress);