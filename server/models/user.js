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
        required : true,
        select   : false
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

User = mongoose.model('User', userSchema);
module.exports = User;