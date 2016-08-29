var mongoose     = require('mongoose'),
    mongooseI18n = require('mongoose-i18n-localize'),
    config       = require('../config/waltz.conf');
var Schema = mongoose.Schema;

var infoSchema = new Schema({
    welcomeText : {
        type     : String,
        required : false,
        i18n     : true
    },
    welcomeTitle : {
        type     : String,
        required : false,
        i18n     : true
    },
    aboutUs : {
        type     : String,
        required : false,
        i18n     : true
    },
    aboutUsTitle : {
        type     : String,
        required : false,
        i18n     : true
    },
    faq : {
        type     : String,
        required : false,
        i18n     : true
    },
    faqTitle : {
        type     : String,
        required : false,
        i18n     : true
    },
    showCalendar : {
        type      : Boolean,
        required  : false,
        default   : true
    },
    showAbout : {
        type      : Boolean,
        required  : false,
        default   : true
    },
    showFAQ : {
        type      : Boolean,
        required  : false,
        default   : true
    },
    usePostDetails : {
        type      : Boolean,
        required  : false,
        default   : true
    }
}, {
    toJSON     : {
        virtuals : true 
    }
});

infoSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.id;
    delete obj._id;
    delete obj.__v;
    return obj;
};

infoSchema.plugin(mongooseI18n, {
    locales : config.supportedLocales
});

var Info = mongoose.model('Info', infoSchema);
module.exports = Info;