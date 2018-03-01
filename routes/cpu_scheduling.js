var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

// FCFS API call
router.post('/fcfs', function(req, res) {

    var input="";
    console.log(req.body);
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/cpu_scheduling/fcfs ' + input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});
});

// SJF NonPremptive API call
router.post('/sjfnonp', function(req,res){
var input="";
    console.log(req.body);
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/cpu_scheduling/sjf_non_preemptive ' + input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

// SJF Premptive API call
router.post('/sjfp', function(req,res){
var input="";
    console.log(req.body);
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/cpu_scheduling/sjf_preemptive ' + input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

// Priority Nonpremptive API call
router.post('/priority-nonpreemptive', function(req,res){
var input="";
    console.log(req.body);
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/cpu_scheduling/priority-nonpreemptive ' + input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

// Priority Premptive API call
router.post('/priority-preemptive', function(req,res){
var input="";
    console.log(req.body);
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/cpu_scheduling/priority-preemptive ' + input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

// Priority Aging API call
router.post('/priority-aging', function(req,res){
var input="";
    console.log(req.body);
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/cpu_scheduling/priority-aging ' + input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

// Round Robin API call
router.post('/round_robin', function(req,res){
var input="";
    console.log(req.body);
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/cpu_scheduling/round_robin ' + input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

module.exports = router;
