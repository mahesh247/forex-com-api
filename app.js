var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var disclaimer = require('./routes/disclaimer');
var terms_of_use = require('./routes/terms-of-use');
var about = require('./routes/about');
var commodity = require('./routes/commodity');
var todaysprice = require('./routes/todaysprice');
var forex = require('./routes/forex');

//Cron
var forexcron = require('./routes/forex-cron');
//var stocklive = require('./routes/stocklive');
//var commodity_db = require('./routes/commodity-db');
//var forex_db = require('./routes/forex-db');
//var todaysprice_db = require('./routes/todaysprice-db');
var cron = require('./routes/cron');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/disclaimer', disclaimer);
app.use('/terms-of-use', terms_of_use);
app.use('/about', about);
app.use('/commodity', commodity);
app.use('/todaysprice', todaysprice);
app.use('/forex', forex);
//app.use('/stocklive', stocklive);
//app.use('/commodity-db', commodity_db);
//app.use('/forex-db', forex_db);
//app.use('/todaysprice-db', todaysprice_db);
app.use('/cron', cron);
app.use('/forex-cron', forexcron);

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
