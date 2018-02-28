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

});

// SJF Premptive API call
router.post('/sjfp', function(req,res){

});

// Priority Nonpremptive API call
router.post('/prioritynonp', function(req,res){

});

// Priority Premptive API call
router.post('/priorityp', function(req,res){

});

// Priority Aging API call
router.post('/priorityaging', function(req,res){

});

// Round Robin API call
router.post('/roundrobin', function(req,res){

});

module.exports = router;
