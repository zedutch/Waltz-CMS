var mongoose = require('mongoose'),
    config   = require('../config/waltz.conf');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title      : String,
    content    : String,
    datePosted : {
        type    : Date,
        default : Date.now
    },
    author     : {
        type    : String,
        default : "Admin"
    }
}, {
    toJSON     : {
        virtuals : true 
    }
});

postSchema.virtual('url').get(function() {
    return config.epPosts + "/" + this._id;
})

var Post = mongoose.model('Post', postSchema);
module.exports = Post;