var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

// Page Replacement Algorithm
router.post('/', function(req,res){
	console.log(req.body.inp);
	exec(__dirname + '/executables/page_replacement/page_replacement ' + req.body.inp , function callback(error,stdout,stderr) {
		console.log(error);
		res.send(stdout);
	});
});

module.exports = router;