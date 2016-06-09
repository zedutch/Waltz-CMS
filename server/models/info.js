var mongoose = require('mongoose'),
    config   = require('../config/waltz.conf');
var Schema = mongoose.Schema;

var infoSchema = new Schema({
    _locale      : {
        type     : String,
        required : true,
        unique   : true,
        select   : false
    },
    welcomeText : {
        type     : String,
        required : false
    }
}, {
    toJSON     : {
        virtuals : true 
    }
});

var Info = mongoose.model('Info', infoSchema);
module.exports = Info;