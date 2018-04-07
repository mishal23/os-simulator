var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

//Contiguous allocation API call
router.post('/continguous', function(req, res){
    console.log(req.body.input);

    exec(__dirname + '/executables/file_allocation/contiguous' + req.body.input, function callback(error,stdout,stderr) {
        console.log("hi" + stdout);
        console.log(error);
        res.send(stdout);
    });
});