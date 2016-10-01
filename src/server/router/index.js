var express = require('express'),
    router  = express.Router();

router.get('/*', function(req, res) {
    res.status(200).json({
        "message" : "Waltz is working!"
    });
});

module.exports = router;