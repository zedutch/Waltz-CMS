var express      = require('express'),
    checkSession = require('./helpers.js').SessionManager.checkSession;
    Page         = require('../models/page.js');
var router = express.Router();

router.get('/', function(req, res) {
    Page.find(function(err, pages) {
        if (!err) {
            return res.send(pages);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.post('/', checkSession, function(req, res) {
    var title = req.body.title;

    var urlString = title.toLowerCase()
                         .trim()
                         .replace(/ /g, "_");

    var page = new Page({
        title     : title,
        content   : req.body.content,
        urlString : urlString
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
        
        var localizedPage = Page.schema.methods.toJSONLocalizedOnly(page, locale, config.defaultLocale);

        return res.status(200).send(localizedPage);
    });
});

router.put('/:urlString', checkSession, function(req, res) {
    var urlString = req.params.urlString;

    Page.update({
        urlString : urlString
    }, {
        $set : {
            title : req.body.title,
            content : req.body.content
        }
    }).exec();

    return res.sendStatus(204);
});

router.delete('/:urlString', checkSession, function(req, res) {
    var urlString = req.params.urlString;

    Page.remove({
        urlString : urlString
    }, function(err) {
        return console.error(err);
    });

    return res.sendStatus(204);
});

module.exports = router;