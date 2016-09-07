var express          = require('express'),
    checkSession     = require('./helpers.js').SessionManager.checkSession,
    getCorrectLocale = require('./helpers.js').getCorrectLocale,
    Info             = require('../models/info.js'),
    Page             = require('../models/page.js'),
    config           = require('../config/waltz.conf');
var router = express.Router();

router.get('/', function(req, res) {
    var locale = getCorrectLocale(req);
    
    Info.findOne({}, function(err, info) {
        if (!info && !err) {
            return res.status(404).send();
        } else if(err) {
            return res.status(500).send(err);
        }
        
        var localizedInfo = Info.schema.methods.toJSONLocalizedOnly(info, locale, config.defaultLocale);

        Page.find(function(err, pages) {
            if (!err) {
                localizedInfo.pages = pages.map(
                    function(page) {
                        var lPage = Page.schema.methods.toJSONLocalizedOnly(page, locale, config.defaultLocale);
                        return {
                            'title' : lPage.title,
                            'url'   : lPage.url
                        };
                    }
                );
                return res.status(200).send(localizedInfo);
            } else {
                return res.status(500).send(err);
            }
        });
    });
});

router.post('/', checkSession, function(req, res) {
    var locale = getCorrectLocale(req);

    Info.findOne({}, function(err, info) {
        if (!info && !err) {
            return res.status(404).send();
        } else if(err) {
            console.error("Error retrieving the info object before editing:", err);
            return res.status(500).send(err);
        }

        delete req.body.pages

        for (var att in req.body) {
            if(info[att][locale] !== undefined) {
                info[att][locale] = req.body[att];
            } else {
                info[att] = req.body[att];
            }
        }

        info.save(function(err) {
            if (!err) {
                var localizedInfo = Info.schema.methods.toJSONLocalizedOnly(info, locale, config.defaultLocale);

                return res.status(200).send(localizedInfo);
            } else {
                console.error("Error saving the info object:", err);
                return res.status(500).send(err);
            }
        });
    });
});

module.exports = router;