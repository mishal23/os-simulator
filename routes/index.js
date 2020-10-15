var express = require('express');
var router = express.Router();
var fs = require('fs');

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

router.post('/upload_file', function(req, res, next) {
	fs.writeFile('./public/test.txt', "hi testing", function (err) {
	  if (err) throw err;
	  res.send("saved file");
	}); 
});

module.exports = router;
