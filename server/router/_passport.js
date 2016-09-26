var passport      = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	mongoose      = require('mongoose'),
	User          = require('../models/user.js');

passport.use(new LocalStrategy({
		usernameField: 'username_lower'
	},
	function (username, password, callback) {
		User.findOne({
			username_lower : username
		}, function (error, user) {
			if (error) {
				return callback(error);
			}

			if (!user) {
				return callback(null, false, {
					error : "Invalid username and/or password!"
				});
			}

			if (!user.isValidPassword(password)) {
				return callback(null, false, {
					error : "Invalid username and/or password!"
				});
			}

			return callback(null, user);
		})
	}
));