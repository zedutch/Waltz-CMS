var express   = require('express'),
    mongoose  = require('mongoose'),
    bcrypt    = require('bcrypt-nodejs'),
    config    = require('../config/waltz.conf');
var router = express.Router();

// MAIN
router.get('/', function(req, res) {
    return res.send({
        "message" : "Welcome to the Waltz API!"
    });
});

// POSTS
var postsRouter = require('./posts.js');
router.use(config.epPosts, postsRouter);

// USERS
var usersRouter = require('./users.js');
router.use(config.epUsers, usersRouter);

// 404
router.use('*', function (req, res){
    res.status(404).send({
        "error" : "Page not found."
    });
});

module.exports = router;