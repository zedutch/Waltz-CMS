var express      = require('express'),
    checkSession = require('./helpers.js').checkSession;
    Post         = require('../models/post.js');
var router = express.Router();

router.get('/', function(req, res) {
    return Post.find(function(err, posts) {
        if (!err) {
            return res.send(posts);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.post('/', checkSession, function(req, res) {
    var post = new Post({
        title : req.body.title,
        content : req.body.content
    });

    post.save(function(err) {
        if (!err) {
            return res.status(200).send(post);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;

    Post.findOne({
        _id : id
    }, function(err, post) {
        if (err) {
            return console.error(err);
        } else {
            post.handleUser(req.session.user);
            return res.send(post);
        }
    });
});

router.put('/:id', checkSession, function(req, res) {
    var id = req.params.id;

    Post.update({
        _id : id
    }, {
        $set : {
            title : req.body.title,
            content : req.body.content
        }
    }).exec();

    return res.sendStatus(204);
});

router.delete('/:id', checkSession, function(req, res) {
    var id = req.params.id;

    Post.remove({
        _id : id
    }, function(err) {
        return console.error(err);
    });

    return res.sendStatus(204);
});

module.exports = router;