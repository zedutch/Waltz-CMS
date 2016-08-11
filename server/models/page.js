var mongoose     = require('mongoose'),
    mongooseI18n = require('mongoose-i18n-localize'),
    config       = require('../config/waltz.conf');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
    title      : {
        type     : String,
        required : true,
        i18n     : true
    },
    urlString  : {
        type     : String,
        required : true,
        unique   : true,
        i18n     : false
    },
    content    : {
        type     : String,
        required : true,
        i18n     : true
    }
}, {
    toObject   : {
        virtuals : true 
    }
});

pageSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.__v;
    delete obj.id
    return obj;
};

pageSchema.plugin(mongooseI18n, {
    locales : config.supportedLocales
});

pageSchema.virtual('url').get(function() {
    return config.epPages + "/" + this.urlString;
});

var Page = mongoose.model('Page', pageSchema);
module.exports = Page;