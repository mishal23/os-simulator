var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

// Page Replacement Algorithm
router.post('/', function(req,res){
	var input = "";
	for(var i=0;i<req.body.length;i++)
	{
		input+=req.body[i]+" ";
	}
	console.log(input);
	
	exec(__dirname + '/executables/page_replacement/page_replacement ' + input , function callback(error,stdout,stderr) {
		console.log(error);
		res.send(stdout);
	});
});

module.exports = router;