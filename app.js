const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Load routes into variables
const index = require('./routes/index');
const queueRouter = require('./routes/queue');
const workerRouter = require('./routes/worker');
const pollingRouter = require('./routes/polling');
const pubsubRouter = require('./routes/pubsub');
const bytecountRouter = require('./routes/bytecount');


const app = express();

// Template engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Generic application setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure routes in Express webserver
app.use('/', index);
app.use('/queue', queueRouter);
app.use('/worker', workerRouter);
app.use('/polling', pollingRouter);
app.use('/pubsub', pubsubRouter);
app.use('/bytecount', bytecountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
