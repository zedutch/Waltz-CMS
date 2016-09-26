var express        = require('express'),
	auth            = require('./_helpers.js').auth,
	passport	   = require('passport'),
    User           = require('../models/user.js'),
    config         = require('../config/waltz.conf');
var router = express.Router();

router.post('/', function(req, res) {
    var password = req.body.password;

    if (req.body.username && req.body.email && req.body.password) {
        var newUser = new User({
            username       : req.body.username,
            username_lower : req.body.username.toLowerCase(),
            email          : req.body.email.toLowerCase(),
            first_name     : req.body.first_name,
            last_name      : req.body.last_name,
            birthdate      : req.body.birthdate,
            address        : req.body.address,
            postal_code    : req.body.postal_code,
            city           : req.body.city,
            telephone      : req.body.telephone
        });

		newUser.setPassword(password);

        newUser.save(function(err, user) {
            if (!err) {
				var token = user.generateToken();
                return res.status(200).send({
					"token" : token,
					"user"  : user
				});
            } else {
                err = err.toJSON();
                delete err.op;
                return res.status(500).send(err);
            }
        });
    } else {
        return res.status(400).send({
            error : "No valid credentials found! To register a new user, provide at least a 'username', an 'email', and a 'password' field."
        });
    }
});

router.get('/', auth, function(req, res) {
	if (!req.session.user.isAdmin && !req.session.user.isStaff) {
		return res.status(401).send();
	}

    User.find({}, function(err, users) {
        if (!err) {
            return res.status(200).send(users);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.get('/:username', auth, function(req, res) {
    var username = req.params.username.toLowerCase();

	if (req.session.user.username !== username && !req.session.user.isAdmin && !req.session.user.isStaff) {
		return res.status(401).send();
	}

    User.findOne({
        username_lower : username
    }, function(err, user) {
        if (!err && user) {
            return res.status(200).send(user);
        } else if (!err) {
            return res.status(404).send();
        } else {
            return console.error(err);
        }
    });
});

router.get(config.epLogin, auth, function(req, res) {
	
});

router.post(config.epLogin, function(req, res) {	
	if (!req.body.username || !req.body.password) {
		return res.status(400).send({
			error : "No valid login credentials found! Provide at least a 'username' field and the matching password in a 'password' field."
		})
	} else if (req.body.username) {
		req.body.username_lower = req.body.username.toLowerCase();
	}
	
	passport.authenticate('local', function (error, user, info) {
		if (error) {
			return res.status(400).send(error);
		}

		if (user) {
			var token = user.generateToken();
			return res.status(200).send({
				"token" : token,
				"user"  : user
			});
		} else {
			return res.status(401).send(info);
		}
	})(req, res);
});

router.get(config.epLogout, function(req, res) {
    // TODO : Implement
});

module.exports = router;