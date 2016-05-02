var express      = require('express'),
    app          = express();


// CONFIGURATION
var config       = require('./app/config/express.conf'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    errorHandler = require('errorhandler'),
    morgan       = require('morgan');

app.set('port',        config.port);
app.set('view engine', 'pug');
app.set('views',       __dirname + '/app/views');
app.set(morgan('dev'));
app.use('/styles', express.static(__dirname + '/app/styles'));
app.use('/dist',   express.static(__dirname + '/app/dist'));
app.use('/img',    express.static(__dirname + '/app/images'));
app.use('/lang',   express.static(__dirname + '/app/lang'));
app.use('/lib',    express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(config.secret));
app.use(session({
    secret            : config.secret,
    resave            : false,
    saveUninitialized : false
}));
app.use(function(err, req, res, next){res.status(err.status || 500);});

if (config.env === 'development') {
     app.use(errorHandler());
}


// ROUTING
var appRouter = require('./app/router');
var apiRouter = require('./server/router');

app.use('/api', apiRouter);
app.use('/',    appRouter);

module.exports = app;


// DATABASE
var mongoose = require('mongoose');
var mongoConn = mongoose.connect('mongodb://' + config.dburl).connection;

mongoConn.once('open', function () {
    console.log("MongoDB connection successfully opened.");
});


// SERVER
var livereload = require('express-livereload');

livereload(app, {watchDir: process.cwd() + '/app/'});
app.listen(app.get('port'), function() {
    console.log("ExpressJS: listening on port " + app.get('port'));
});