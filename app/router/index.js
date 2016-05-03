var express = require('express'),
    router  = express.Router();

var envVariables = {
    env : function(variable) {
        var fileEnd = variable.indexOf('.');
        if (fileEnd < 0) {
            console.error("Environment variables should always contain at least one dot '.'! This is invalid:", variable);
            return "%ERROR:" + variable + "%";
        } else {
            var file = "../config/" + variable.substr(0, fileEnd) + ".conf";
            var envConf = require(file);
            return envConf[variable.substr(fileEnd + 1)];
        }
    }
};

router.get('/', function(req, res) {
    res.render('index', envVariables);
});

router.get('/views/:name', function(req, res) {
    var name = req.params.name;
    res.render('views/' + name, envVariables);
});

router.get('/components/:name', function(req, res) {
    var name = req.params.name;
    res.render('components/' + name, envVariables);
});

router.use('*', function (req, res){
    res.status(404).send({
        "error" : "Page not found."
    });
});

module.exports = router;