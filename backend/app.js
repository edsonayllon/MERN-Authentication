const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const logger = require('morgan');
const mongoose = require('mongoose');

const withAuth = require('./middleware');
const indexRouter = require('./routes/index.route');
const homeRouter = require('./routes/home.route');
const secretRouter = require('./routes/secret.route');
const registerRouter = require('./routes/register.route');
const authenticateRouter = require('./routes/authenticate.route');
const config = require('./config')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// initialize app
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  Force https in production
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}

// Connect to MongoDB
mongoose.connect(config.MONGO_URI, {
  //fixes deprication warnings
  useCreateIndex: true,
  useNewUrlParser: true
}, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${config.MONGO_URI}`);
  }
});


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
