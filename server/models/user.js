var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username   : {
        type     : String,
        required : true,
        unique   : true
    },
    password   : {
        type     : String,
        required : true
    },
    salt       : {
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
});

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    delete obj.salt;
    delete obj.__v;
    return obj;
};

User = mongoose.model('User', userSchema);
module.exports = User;