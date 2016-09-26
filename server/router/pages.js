var express           = require('express'),
    auth              = require('./_helpers.js').auth,
    getCorrectLocale  = require('./_helpers.js').getCorrectLocale,
    shouldLocalize    = require('./_helpers.js').shouldLocalize,
    sanitizeUrlString = require('./_helpers.js').sanitizeUrlString,
    Page              = require('../models/page.js'),
    config            = require('../config/waltz.conf');
var router = express.Router();

router.get('/', function(req, res) {
    Page.find(function(err, pages) {
        if (!err) {
            var localizedPages = pages
            if (shouldLocalize(req)) {
                var locale = getCorrectLocale(req);
                localizedPages = pages.map(
                    page => Page.schema.methods.toJSONLocalizedOnly(page, locale, config.defaultLocale)
                );
            }
            return res.send(localizedPages);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.post('/', auth, function(req, res) {
	if (!req.session.user.isAdmin && !req.session.user.isStaff) {
		return res.status(401).send();
	}

    var title = req.body.title;
    var urlString = sanitizeUrlString(title);
    var now = new Date().toISOString();

    var page = new Page({
        title      : title,
        content    : req.body.content,
        urlString  : urlString,
        lastEditBy : req.session.user.name,
        lastEditOn : now
    });

    page.save(function(err) {
        if (!err) {
            return res.status(200).send(page);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.get('/:urlString', function(req, res) {
    var urlString = req.params.urlString;

    Page.findOne({
        urlString : urlString
    }, function(err, page) {
        if (!page && !err) {
            return res.status(404).send();
        } else if (err) {
            return res.status(500).send(err);
        }

        var localizedPage = page;

        if (shouldLocalize(req)) {
            var locale = getCorrectLocale(req);
            localizedPage = Page.schema.methods.toJSONLocalizedOnly(page, locale, config.defaultLocale);
        }

        return res.status(200).send(localizedPage);
    });
});

router.put('/:urlString', auth, function(req, res) {
	if (!req.session.user.isAdmin && !req.session.user.isStaff) {
		return res.status(401).send();
	}

    var urlString = req.params.urlString;
    var locale = getCorrectLocale(req);
    var now = new Date().toISOString();

    Page.findOne({
        urlString : urlString
    }, function(err, page) {
        if (!page && !err) {
            return res.status(404).send();
        } else if(err) {
            console.error("Error retrieving a page object before editing:", err);
            return res.status(500).send(err);
        }

        if (shouldLocalize(req)) {
            page.title[locale]      = req.body.title;
            page.content[locale]    = req.body.content;
        } else {
            page.title   = req.body.title;
            page.content = req.body.content;
        }

        page.lastEditBy = req.session.user.name;
        page.lastEditOn = now;

        page.save(function(err) {
            if (!err) {

                var localizedpage = page
                
                if (shouldLocalize(req)) {
                    localizedpage = Page.schema.methods.toJSONLocalizedOnly(page, locale, config.defaultLocale);
                }

                return res.status(200).send(localizedpage);
            } else {
                console.error("Error saving a page object:", err);
                return res.status(500).send(err);
            }
        });
    });
});

router.delete('/:urlString', auth, function(req, res) {
	if (!req.session.user.isAdmin && !req.session.user.isStaff) {
		return res.status(401).send();
	}

    var urlString = req.params.urlString;

    Page.remove({
        urlString : urlString
    }, function(err) {
        return console.error(err);
    });

    return res.sendStatus(204);
});

module.exports = router;