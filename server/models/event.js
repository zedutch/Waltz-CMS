var mongoose = require('mongoose'),
    config   = require('../config/waltz.conf');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title      : {
        type     : String,
        required : true
    },
    date : {
        type     : Date,
        required : true
    },
    endDate : {
        type     : Date,
        required : true
    },
    info    : {
        type     : String,
        required : true
    },
    price : {
        type     : Number,
        required : true
    },
    priceMember : {
        type     : Number,
        required : true
    },
    subscribeUrl : String
}, {
    toJSON     : {
        virtuals : true 
    }
});

eventSchema.virtual('url').get(function() {
    return config.epEvents + "/" + this._id;
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;