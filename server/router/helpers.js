var bcrypt = require('bcrypt-nodejs');

exports.getURL = function(req) {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
};

exports.getMethods = function (methods) {
    var methString = "(";
    for (var method in methods) {
        methString += method.toUpperCase() + ", ";
    }
    methString = methString.substr(0, methString.length - 2) + ")";
    return methString;
};

exports.checkBody = function (body, requiredFields, objectName, res) {
    if (!body) {
        res.status(400).send({
            "error" : "Please provide a valid " + objectName + "-object in the request body."
        });
        return false;
    } else {
        for (var fieldIndex in requiredFields) {
            var field = requiredFields[fieldIndex];
            if (!body[field]) {
                res.status(400).send({
                    "error" : "Please provide a valid " + objectName + "-object in the request body. Missing field: " + field
                });
                return false;
            }
        }
    }
    return true;
};

var sessions = {};

exports.SessionManager = {
    createSession : function (req, userId, callback) {
        var sid = bcrypt.genSaltSync(10).substring(7);
        req.session.regenerate(function() {
            req.session.user = userId;
            req.session.sid  = sid;
            sessions[userId] = sid;
            callback();
        });
    },
    checkSession : function (req, res, callback) {
        var authorized = false;
        if (req.session.user) {
            var sid = sessions[req.session.user];
            authorized = sid == req.session.sid;
        }

        if (authorized) {
            callback();
        } else {
            res.status(401).send({
                error : "Authorization failed."
            });
        }
    },
    destroySession : function (req, callback) {
        var userId = req.session.user;
        req.session.destroy(function () {
            if (userId) {
                delete sessions[userId];
            }
            callback();
        });
    }
};