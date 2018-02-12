var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

var msg="";

// FCFS executable call
router.post('/', function(req, res) {

	//console.log(req.body);
	//console.log(req.body.length);
	for(var i=0;i<req.body.length;i++)
	{
		msg+=(i+1)+" "+req.body[i]+" ";
	}
	//console.log(msg);
	exec(__dirname + '/executables/cpu_scheduling/fcfs 3 1 '+ req.body[0]+ ' 2 '+ req.body[1] + ' 3 ' + req.body[2], function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(stderr);
		res.send(stdout);
	});
});

module.exports = router;
