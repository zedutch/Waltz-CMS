var mongoose        = require('mongoose'),
    mongooseI18n    = require('mongoose-i18n-localize'),
    config          = require('../config/waltz.conf');
var Schema = mongoose.Schema;

var infoSchema = new Schema({
    welcomeText : {
        type     : String,
        required : false,
        i18n     : true
    }
}, {
    toJSON     : {
        virtuals : true 
    }
});

infoSchema.plugin(mongooseI18n, {
    locales : config.supportedLocales
});

var Info = mongoose.model('Info', infoSchema);
module.exports = Info;