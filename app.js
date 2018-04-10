var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Call all the routes here
var index = require('./routes/index');
var system_calls = require('./routes/system_calls');
var cpu_scheduling = require('./routes/cpu_scheduling');
var bankers = require('./routes/bankers');
var disk_scheduling = require('./routes/disk_scheduling');
var page_replacement = require('./routes/page_replacement');
var memory_management = require('./routes/memory_management');
var file_allocation = require('./routes/file_allocation');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/system_calls', system_calls);
app.use('/cpu_scheduling', cpu_scheduling);
app.use('/bankers', bankers);
app.use('/disk_scheduling', disk_scheduling);
app.use('/page_replacement', page_replacement);
app.use('/memory_management', memory_management);
app.use('/file_allocation', file_allocation);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


/*
	HTML2Jade converter :- http://html2jade.aaron-powell.com/
*/
