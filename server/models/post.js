var mongoose = require('mongoose'),
    mongooseI18n = require('mongoose-i18n-localize'),
    config   = require('../config/waltz.conf');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title      : {
        type     : String,
        required : true,
        i18n     : true
    },
    content    : {
        type     : String,
        required : true,
        i18n     : true
    },
    urlString  : {
        type     : String,
        required : true,
        unique   : true
    },
    author     : {
        type    : String,
        default : config.defaultAuthor
    },
    postedOn   : String,
    lastEditOn : {
        type     : String,
        required : false
    },
    lastEditBy : String,
}, {
    toObject   : {
        virtuals : true 
    }
});

postSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.__v;
    delete obj.id
    return obj;
};

postSchema.plugin(mongooseI18n, {
    locales : config.supportedLocales
});

postSchema.virtual('url').get(function() {
    return config.epPosts + "/" + this.urlString;
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;