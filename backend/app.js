const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require("cors");
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

// auth routes
const checkTokenRouter = require('./routes/auth/checkToken.route');
const registerRouter = require('./routes/auth/register.route');
const authenticateRouter = require('./routes/auth/authenticate.route');
const forgotPasswordRouter = require('./routes/auth/forgotPassword.route');
const resetPasswordRouter = require('./routes/auth/resetPassword.route');

// api routes
const indexRouter = require('./routes/index.route');
const homeRouter = require('./routes/home.route');
const secretRouter = require('./routes/secret.route');

const config = require('./config');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// initialize app
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
  useNewUrlParser: true,
}, function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${config.MONGO_URI}`);
    }
  }
);

// Passport
require('./middleware/passport.middleware')(passport);

// Routes with middleware
app.use('/', indexRouter);
app.use('/api/home', homeRouter);
app.use('/api/secret',
  passport.authenticate('jwt', { session : false }),
  secretRouter
);
app.use('/auth/register', registerRouter);
app.use('/auth/authenticate', authenticateRouter);
app.use('/auth/forgot-password', forgotPasswordRouter);
app.use('/auth/checkToken',
  passport.authenticate('jwt', { session : false }),
  checkTokenRouter
);
app.use('/auth/password-reset', resetPasswordRouter);

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
