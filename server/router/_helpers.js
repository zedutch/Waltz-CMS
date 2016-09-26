var jwt    = require('express-jwt'),
    config = require('../config/waltz.conf');

exports.auth = jwt({
	secret       : config.hashSecret,
	userProperty : 'session'
})

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
};

exports.sanitizeUrlString = function(urlString) {
    return urlString.toLowerCase()
                 .trim()
                 .replace(/ /g, "_")
                 .replace(/[\.!?\\/]/g, "");
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