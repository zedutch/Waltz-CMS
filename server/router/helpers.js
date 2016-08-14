var bcrypt = require('bcrypt-nodejs'),
    config = require('../config/waltz.conf');

exports.getCorrectLocale = function(req) {
    var locale_req = req.headers["accept-language"].substring(0, 2);
    var locale = locale_req;
    var supported_req = config.supportedLocales;
    if (supported_req.indexOf(locale_req) < 0) {
        console.log("User requested language", locale_req, "but it is not supported. Supported languages are", supported_req);
        locale = config.defaultLocale;
    }
    
    console.log("Locale used:", locale);
    
    return locale
};

exports.shouldLocalize = function(req) {
    var shouldLocalize = req.headers["x-localize"]
    return shouldLocalize !== "false"
}

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
    createSession : function (req, userId, username, callback) {
        var sid = bcrypt.genSaltSync(10).substring(7);
        req.session.regenerate(function() {
            req.session.user = userId;
            req.session.sid  = sid;
            req.session.name = username;
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