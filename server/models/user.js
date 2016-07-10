var mongoose = require('mongoose'),
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
        unique   : true
    },
    password   : {
        type     : String,
        required : true
    },
    email      : {
        type     : String,
        unique   : true,
        required : true
    },
    firstName : String,
    lastName  : String,
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
    delete obj.password;
    delete obj.salt;
    delete obj.__v;
    delete obj.username_lower;
    return obj;
};

User = mongoose.model('User', userSchema);
module.exports = User;