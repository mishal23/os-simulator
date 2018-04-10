var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

// access() call
router.post('/access', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/access ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// alarm() call
router.post('/alarm', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/alarm ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// creat() call
router.post('/creat', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/creat ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// dup() call
router.post('/dup', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/dup ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// exit() call
router.post('/exit', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/exit ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// fork() call
router.post('/fork', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/fork ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// getid() call
router.post('/getid', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/getid ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// kill() call
router.post('/kill', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/kill ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// link() call
router.post('/link', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/link ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// lseek() call
router.post('lseek', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/lseek ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// open() call
router.post('/open', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/open ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// read() call
router.post('/read', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/read ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// unlink() call
router.post('/unlink', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/unlink ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// wait() call
router.post('/access', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/wait ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

// write() call
router.post('/write', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/write ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});
// man() call
router.post('/man', function(req,res){
	var input="";
	console.log(req.body.input);
	exec(__dirname + '/executables/system_calls/man ' + req.body.input , function callback(error,stdout,stderr) {
		console.log(stdout);
		console.log(error);
		res.send(stdout);
	});
});

module.exports=router;
