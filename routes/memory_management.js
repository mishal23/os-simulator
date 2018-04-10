var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

//mft first fit
router.post('/mft_first_fit', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/memory_management/mftfirst ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

//mft best fit
router.post('/mft_best_fit', function(req,res){
	var input = "";
	console.log(req.body.input);

	exec(__dirname + '/executables/memory_management/mftbest ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});


//mft worst fit
router.post('/mft_worst_fit', function(req,res){
	var input = "";
	console.log(req.body.input);

	exec(__dirname + '/executables/memory_management/mftworst ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

module.exports = router;
