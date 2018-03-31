var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

// Safe Sequence call
router.post('/safe_sequence', function(req,res){
	var input = "";
	console.log(req.body.arguments);
	
	console.log(input);
	
	exec(__dirname + '/executables/bankers/bankers_safe_sequence ' + req.body.arguments , function callback(error,stdout,stderr) {
		console.log(error);
		console.log(stdout);
		res.send(stdout);
	});
});

// Resource Request call
router.post('/resource_request', function(req,res){
	var input = "";
	console.log(input);
	console.log(req.body.arguments);
	
	exec(__dirname + '/executables/bankers/bankers_resource_request ' + req.body.arguments , function callback(error,stdout,stderr) {
		console.log(error);
		res.send(stdout);
	});
});

module.exports = router;