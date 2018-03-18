var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

// FCFS Disk Scheduling
router.post('/fcfs', function(req,res){
	var input = "";
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/disk_scheduling/dfcfs ' + input , function callback(error,stdout,stderr) {
		console.log(error);
		res.send(stdout);
	});
});

// Shortest Seek Time First
router.post('/sstf', function(req,res){
	var input = "";
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/disk_scheduling/sstf ' + input , function callback(error,stdout,stderr) {
		console.log(error);
		res.send(stdout);
	});
});


// Look
router.post('/look', function(req,res){
	var input = "";
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/disk_scheduling/look ' + input , function callback(error,stdout,stderr) {
		console.log(error);
		res.send(stdout);
	});
});


// Scan
router.post('/scan', function(req,res){
	var input = "";
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/disk_scheduling/scan ' + input , function callback(error,stdout,stderr) {
		console.log(error);
		res.send(stdout);
	});
});

// C-Scan
router.post('/cscan', function(req,res){
	var input = "";
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/disk_scheduling/cscan ' + input , function callback(error,stdout,stderr) {
		console.log(error);
		res.send(stdout);
	});
});

// C-Look
router.post('/clook', function(req,res){
	var input = "";
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/disk_scheduling/clook ' + input , function callback(error,stdout,stderr) {
		console.log(error);
		res.send(stdout);
	});
});

module.exports = router;
