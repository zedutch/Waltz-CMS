var express   = require('express'),
    bcrypt    = require('bcrypt-nodejs'),
    User      = require('../models/user.js'),
    config    = require('../config/waltz.conf');;
var router = express.Router();

router.post('/', function(req, res) {
    var password = req.body.password,
        salt     = bcrypt.genSaltSync(10),
        hash     = bcrypt.hashSync(password, salt);

    var newUser = new User({
        username   : req.body.username,
        password   : hash,
        salt       : salt,
        email      : req.body.email,
        first_name : req.body.first_name,
        last_name  : req.body.last_name
    });

    newUser.save(function(err) {
        if (!err) {
            return res.status(200).send(newUser);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.post(config.epLogin, function(req, res) {
    var username = req.body.username,
        password = req.body.password,
        email    = req.body.email;

    var validateCredentials = function(err, data) {
        if (err || data === null) {
            return res.status(401).send({
                error : "No such user exists!"
            });
        }

        User.findOne({
            username : username
        }).select('password').exec(function(err, pw) {
            data.password = pw.password;

            if (username === data.username &&
                bcrypt.compareSync(password, data.password)) {

                req.session.regenerate(function() {
                    req.session.user = username;
                    data.password = undefined;
                    return res.send(data);
                });
            } else {
                return res.status(401).send({
                    error : "Invalid username and/or password!"
                });
            }
        });
    };

    if (username) {
        User.findOne({
            username : username
        }, validateCredentials);
    } else if(email) {
        User.findOne({
            email : email
        }, validateCredentials);
    } else {
        return res.status(400).send({
            error : "No valid login credentials found! Provide at least either a 'username' or 'email' field and the matching password."
        });
    }
});

router.get(config.epLogout, function(req, res) {
    req.session.destroy(function() {
        return res.send(204);
    })
});

module.exports = router;