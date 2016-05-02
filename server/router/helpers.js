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

exports.checkSession = function (req, res, callback) {
    if (req.session.user) {
        callback();
    } else {
        response.send(401, {
            error : "Authorization failed."
        });
    }
};