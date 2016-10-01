var express = require('express'),
    app     = express();

var path         = require('path'),
    morgan       = require('morgan'),
    bodyParser   = require('body-parser'),
    errorHandler = require('errorhandler'),
    config       = require('../config/express.conf');

app.set('port', (config.port || 8123));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(function(err, req, res, next){res.status(err.status || 500);});


// ROUTING
var apiRouter = require('./router');
app.use('/', apiRouter);


// DATABASE
var mongoose = require('mongoose');
var db       = mongoose.connect('mongodb://' + config.dburl).connection;

mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDB connection successfully opened.");
});

app.listen(app.get('port'), function() {
    console.log('ExpressJS listening on port '+app.get('port'));
}); 

module.exports = app;