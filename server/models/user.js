var mongoose = require('mongoose'),
	crypto   = require('crypto'),
	jwt      = require('jsonwebtoken'),
    config   = require('../config/waltz.conf');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username   : {
        type     : String,
        required : true,
        unique   : true
    },
    username_lower : {
        type     : String,
        required : true,
        unique   : true,
		lowercase: true
    },
    hash	   : {
        type     : String
    },
	salt	   : {
        type     : String
    },
    email      : {
        type     : String,
        unique   : true,
        required : true,
		lowercase: true
    },
    firstName   : String,
    lastName    : String,
    birthdate   : String,
    address     : String,
    postal_code : String,
    city        : String,
    telephone   : String,
    isAdmin   : {
        type     : Boolean,
        default  : false
    },
    isStaff   : {
        type     : Boolean,
        default  : false
    }
}, {
    toObject  : {
        virtuals : true 
    }
});

userSchema.virtual('url').get(function() {
    return config.epUsers + "/" + this.username_lower;
});

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.salt;
    delete obj.__v;
    delete obj.id;
	delete obj.hash;
	delete obj._id;
    delete obj.username_lower;
    return obj;
};

userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, config.hashIterations, config.hashLength).toString('hex');
};

userSchema.methods.isValidPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, config.hashIterations, config.hashLength).toString('hex');
	return this.hash === hash;
};

userSchema.methods.generateToken = function() {
	var exp = new Date();
	exp.setDate(exp.getDate() + config.sessionLength);

	return jwt.sign({
		_id      : this._id,
		email    : this.email,
		username : this.username_lower,
		isStaff  : this.isStaff,
		isAdmin  : this.isAdmin,
		exp      : parseInt(exp.getTime() / 1000)
	}, config.hashSecret);
};

User = mongoose.model('User', userSchema);
module.exports = User;