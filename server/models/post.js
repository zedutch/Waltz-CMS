var mongoose = require('mongoose'),
    config   = require('../config/waltz.conf');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title      : {
        type     : String,
        required : true
    },
    content    : {
        type     : String,
        required : true
    },
    datePosted : {
        type    : Date,
        default : Date.now
    },
    author     : {
        type    : String,
        default : config.defaultAuthor
    },
    canEdit    : {
        type    : Boolean,
        default : false
    }
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

postSchema.virtual('url').get(function() {
    return config.epPosts + "/" + this._id;
});

postSchema.methods.handleUser = function handleUser(user) {
    this.canEdit = !!user && (user.isAdmin || user.isStaff);
};

var Post = mongoose.model('Post', postSchema);
module.exports = Post;