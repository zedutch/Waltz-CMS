var express = require('express'),
    router  = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/views/:name', function(req, res) {
    var name = req.params.name;
    res.render('views/' + name);
});

router.get('/components/:name', function(req, res) {
    var name = req.params.name;
    res.render('components/' + name);
});

router.use('*', function (req, res){
    res.status(404).send({
        "error" : "Page not found."
    });
});

module.exports = router;