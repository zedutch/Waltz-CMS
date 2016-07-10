var express      = require('express'),
    checkSession = require('./helpers.js').SessionManager.checkSession;
    Event        = require('../models/event.js');
var router = express.Router();

router.get('/', function(req, res) {
    return Event.find(function(err, events) {
        if (!err) {
            return res.send(events);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.post('/', checkSession, function(req, res) {
    var event = new Event({
        title        : req.body.title,
        date         : req.body.date,
        endDate      : req.body.endDate,
        info         : req.body.info,
        price        : req.body.price,
        priceMember  : req.body.priceMember,
        subscribeUrl : req.body.subscribeUrl
    });

    event.save(function(err) {
        if (!err) {
            return res.status(200).send(event);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;

    Event.findOne({
        _id : id
    }, function(err, event) {
        if (err) {
            return console.error(err);
        } else {
            return res.send(event);
        }
    })
});

router.put('/:id', checkSession, function(req, res) {
    var id = req.params.id;

    Event.update({
        _id : id
    }, {
        $set : {
            title        : req.body.title,
            date         : req.body.date,
            endDate      : req.body.endDate,
            info         : req.body.info,
            price        : req.body.price,
            priceMember  : req.body.priceMember,
            subscribeUrl : req.body.subscribeUrl
        }
    }).exec();

    return res.sendStatus(204);
});

router.delete('/:id', checkSession, function(req, res) {
    var id = req.params.id;

    Event.remove({
        _id : id
    }, function(err) {
        return console.error(err);
    });

    return res.sendStatus(204);
});

module.exports = router;