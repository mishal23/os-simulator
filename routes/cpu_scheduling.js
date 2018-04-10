var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

// FCFS API call
router.post('/fcfs', function(req, res) {

    var input="";
    console.log(req.body.input);
	/*for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	*/
	exec(__dirname + '/executables/cpu_scheduling/fcfs ' + req.body.input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});
});

// SJF NonPremptive API call
router.post('/sjf-nonpreemptive', function(req,res){
	 var input="";
    console.log(req.body.input);
	/*for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	*/
	exec(__dirname + '/executables/cpu_scheduling/sjf-nonpreemptive ' + req.body.input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

// SJF Premptive API call
router.post('/sjf-preemptive', function(req,res){
	 var input="";
    console.log(req.body);
	/*for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}*/
	console.log(input);
	
	exec(__dirname + '/executables/cpu_scheduling/sjf-preemptive ' + req.body.input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

// Priority Nonpremptive API call
router.post('/priority-nonpreemptive', function(req,res){
	 var input="";
    console.log(req.body.input);
	/*for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	*/
	exec(__dirname + '/executables/cpu_scheduling/priority-nonpreemptive ' + req.body.input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

// Priority Premptive API call
router.post('/priority-preemptive', function(req,res){
	 var input="";
    console.log(req.body.input);
	/*for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	*/
	exec(__dirname + '/executables/cpu_scheduling/priority-preemptive ' + req.body.input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

// Priority Aging API call
router.post('/priority-aging', function(req,res){
	 var input="";
    console.log(req.body.input);
	/*for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	*/
	exec(__dirname + '/executables/cpu_scheduling/priority-aging ' + req.body.input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

// Round Robin API call
router.post('/round_robin', function(req,res){
	 var input="";
    console.log(req.body.input);
	/*for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	*/
	exec(__dirname + '/executables/cpu_scheduling/round_robin ' + req.body.input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});


// Multilevel Queue API call
router.post('/multilevel_queue', function(req,res){
	 var input="";
    console.log(req.body.input);
	/*for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	*/
	exec(__dirname + '/executables/cpu_scheduling/multilevel_queue ' + req.body.input , function callback(error,stdout,stderr) {
		console.log("hi" + stdout);
		console.log(error);
		res.send(stdout);
	});

});

module.exports = router;
