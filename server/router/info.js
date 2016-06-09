var express      = require('express'),
    checkSession = require('./helpers.js').checkSession;
    Info         = require('../models/info.js'),
    config       = require('../config/waltz.conf');;
var router = express.Router();

router.get('/', function(req, res) {
    var locale_req = req.headers["accept-language"].substring(0, 2);
    var locale = locale_req;
    var supported_req = config.supportedLocales;
    if (supported_req.indexOf(locale_req) < 0) {
        console.log("User requested language", locale_req, "but it is not supported. Supported languages are", supported_req);
        locale = config.defaultLocale;
    }
    
    console.log("Locale used:", locale);
    
    Info.findOne({
        _locale : locale
    }, function(err, info) {
        if (!err && info) {
            return res.status(200).send(info);
        } else if(!err && !info) {
            return res.status(404).send();
        } else {
            console.error(err);
            return res.status(500).send(err);
        }
    });
});

module.exports = router;