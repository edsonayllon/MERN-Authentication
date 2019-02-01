const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const withAuth = require('./middleware');
const indexRouter = require('./routes/index');
const homeRouter = require('./routes/home');
const secretRouter = require('./routes/secret');
const registerRouter = require('./routes/register');
const authenticateRouter = require('./routes/authenticate');

const app = express();
const mongo_uri = 'mongodb://localhost/react-auth';

mongoose.connect(mongo_uri, {
  //fixes deprication warnings
  useCreateIndex: true,
  useNewUrlParser: true
}, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/home', homeRouter);
app.use('/api/secret', secretRouter);
app.use('/api/register', registerRouter);
app.use('/api/authenticate', authenticateRouter);

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
