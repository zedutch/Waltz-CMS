var express         = require('express'),
    checkSession    = require('./helpers.js').checkSession;
    Info            = require('../models/info.js'),
    config          = require('../config/waltz.conf');
var router = express.Router();

function getCorrectLocale (req) {
    var locale_req = req.headers["accept-language"].substring(0, 2);
    var locale = locale_req;
    var supported_req = config.supportedLocales;
    if (supported_req.indexOf(locale_req) < 0) {
        console.log("User requested language", locale_req, "but it is not supported. Supported languages are", supported_req);
        locale = config.defaultLocale;
    }
    
    console.log("Locale used:", locale);
    
    return locale
}

router.get('/', function(req, res) {
    var locale = getCorrectLocale(req);
    
    Info.findOne({}, function(err, info) {
        if (!info && !err) {
            return res.status(404).send();
        } else if(err) {
            return res.status(500).send(err);
        }
        
        var localizedInfo = Info.schema.methods.toJSONLocalizedOnly(info, locale, config.defaultLocale);
        
        return res.status(200).send(localizedInfo);
    });
});

router.post('/', /*checkSession,*/ function(req, res) {
    var locale = getCorrectLocale(req);
    
    var info = new Info({
        welcomeText : {}
    });
    info.welcomeText[locale] = req.body.welcomeText;
    
    info.save(function(err) {
        if (!err) {
            var localizedInfo = Info.schema.methods.toJSONLocalizedOnly(info, locale, config.defaultLocale);
            
            return res.status(200).send(localizedInfo);
        } else {
            return res.status(500).send(err);
        }
    });
});

module.exports = router;