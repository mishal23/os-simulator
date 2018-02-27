var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

// FCFS executable call
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

module.exports = router;
