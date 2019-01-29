var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("HI");
  res.render('index', { title: 'Express' });
});

router.get('/testslackbot', function(req, res, next) {
	res.send("New deployed");
});

router.post('/slackbot', function(req, res, next) {
	console.log(req.body);
	res.send(req.body.challenge);
});

module.exports = router;
