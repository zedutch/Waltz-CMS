var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username   : String,
    password   : String,
    email      : String,
    first_name : String,
    last_name  : String
});

User = mongoose.model('User', userSchema);
module.exports = User;