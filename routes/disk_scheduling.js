var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

// FCFS Disk Scheduling
router.post('/dfcfs', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/disk_scheduling/dfcfs ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// Shortest Seek Time First
router.post('/sstf', function(req,res){
	var input = "";
	console.log(req.body.input);
	
	exec(__dirname + '/executables/disk_scheduling/sstf ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});


// Look
router.post('/look', function(req,res){
	var input = "";
	
	console.log(req.body.input);
	
	exec(__dirname + '/executables/disk_scheduling/look ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});


// Scan
router.post('/scan', function(req,res){
	var input = "";
	console.log(req.body.input);
	
	exec(__dirname + '/executables/disk_scheduling/scan ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// C-Scan
router.post('/cscan', function(req,res){
	var input = "";
	console.log(req.body.input);
	
	exec(__dirname + '/executables/disk_scheduling/cscan ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// C-Look
router.post('/clook', function(req,res){
	var input = "";
	console.log(req.body.input);
	
	exec(__dirname + '/executables/disk_scheduling/clook ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

module.exports = router;
