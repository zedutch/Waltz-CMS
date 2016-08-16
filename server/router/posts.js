var express          = require('express'),
    checkSession     = require('./helpers.js').SessionManager.checkSession,
    getCorrectLocale = require('./helpers.js').getCorrectLocale,
    shouldLocalize   = require('./helpers.js').shouldLocalize,
    sanitizeUrlString = require('./helpers.js').sanitizeUrlString,
    Post             = require('../models/post.js'),
    config           = require('../config/waltz.conf');
var router = express.Router();

router.get('/', function(req, res) {
    Post.find(function(err, posts) {
        if (!err) {
            var localizedPosts = posts
            if (shouldLocalize(req)) {
                var locale = getCorrectLocale(req);
                localizedPosts = posts.map(
                    post => Post.schema.methods.toJSONLocalizedOnly(post, locale, config.defaultLocale)
                );
            }
            return res.send(localizedPosts);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.post('/', checkSession, function(req, res) {
    var now = new Date().toISOString();
    var title = req.body.title
    var urlString = sanitizeUrlString(title);

    var post = new Post({
        title     : req.body.title,
        content   : req.body.content,
        urlString : urlString,
        author    : req.session.name,
        postedOn  : now
    });

    post.save(function(err) {
        if (!err) {
            return res.status(200).send(post);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.get('/:urlString', function(req, res) {
    var urlString = req.params.urlString;

    Post.findOne({
        urlString : urlString
    }, function(err, post) {
        if (!err) {
            var localizedPost = post
            if (shouldLocalize(req)) {
                var locale = getCorrectLocale(req);
                localizedPost = Post.schema.methods.toJSONLocalizedOnly(post, locale, config.defaultLocale)
            }
            return res.send(localizedPost);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.put('/:urlString', checkSession, function(req, res) {
    var urlString = req.params.urlString;
    var locale = getCorrectLocale(req);
    var now = new Date().toISOString();

    Post.findOne({
        urlString : urlString
    }, function(err, post) {
        if (!post && !err) {
            return res.status(404).send();
        } else if(err) {
            console.error("Error retrieving a post object before editing:", err);
            return res.status(500).send(err);
        }

        if (shouldLocalize(req)) {
            post.title[locale]      = req.body.title;
            post.content[locale]    = req.body.content;
        } else {
            post.title   = req.body.title;
            post.content = req.body.content;
        }

        post.lastEditBy = req.session.name;
        post.lastEditOn = now;

        post.save(function(err) {
            if (!err) {

                var localizedpost = post
                
                if (shouldLocalize(req)) {
                    localizedpost = Post.schema.methods.toJSONLocalizedOnly(post, locale, config.defaultLocale);
                }

                return res.status(200).send(localizedpost);
            } else {
                console.error("Error saving a post object:", err);
                return res.status(500).send(err);
            }
        });
    });
});

router.delete('/:urlString', checkSession, function(req, res) {
    var urlString = req.params.urlString;

    Post.remove({
        urlString : urlString
    }, function(err) {
        return console.error(err);
    });

    return res.sendStatus(204);
});

module.exports = router;