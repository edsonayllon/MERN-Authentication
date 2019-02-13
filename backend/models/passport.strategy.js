const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./user.model');
const config = require('../config.js')
const secret = config.SECRET_KEY

const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, cb) {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    return User.findOne({email, password})
    .then(user => {
       if (!user) {
           return cb(null, false, {message: 'Incorrect email or password.'});
       }
       return cb(null, user, {message: 'Logged In Successfully'});
    })
    .catch(err => cb(err));
  }
);

const jwtStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : secret
  },
  function (jwtPayload, cb) {

  //find the user in db if needed
  return User.findOneById(jwtPayload.id)
    .then(user => {
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    });
  }
);

passport.use(localStrategy);
passport.use(jwtStrategy);


module.exports = passport;
