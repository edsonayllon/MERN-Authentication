const config = require('../config');
const secret = config.SECRET_KEY;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const argon2 = require('argon2');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {

  passport.use('local-register', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
  }, async (email, password, done) => {
    try {
      let emailVerificationToken = crypto.randomBytes(32).toString('base64');
      let emailVerificationHash = await argon2.hash(emailVerificationToken, {type: argon2.argon2id})
      let user = await new User;
      user.local.email = email;
      user.local.password = password;
      user.local.emailVerificationHash = emailVerificationHash;
      user.local.emailVerificationExpiry = new Date().valueOf() + (1000 * 60 * 60) // Expires in 1 hour. Make it a shorter time for production app.
      user.save( (err) => {
        if (err) {
          console.log('error saving user')
          return done(null, false, { message : 'Error creating account' });
        }
        return done(null, user, {
          message : 'Account created, check your email to activate your account',
          emailAddress: user.local.email,
          emailVerificationToken: emailVerificationToken
        });
      })
    } catch (err) {
      console.log(err);
      return done(null, false, { message : err });
    }
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
  }, async (email, password, done) => {
    try {
      //Find the user associated with the email provided by the user
      const user = await User.findOne({ "local.email": email });
      if( !user ){
        //If the user isn't found in the database, return a message
        return done(null, false, { message : 'Account not found. Check username or register an account'});
      }
      //Validate password and make sure it matches with the corresponding hash stored in the database
      //If the passwords match, it returns a value of true.
      const validate = await user.isValidPassword(password);
      if( !validate ){
        return done(null, false, { message : 'Incorrect Password'});
      }
      //Send the user information to the next middleware
      return done(null, user, { message : 'Logged in Successfully'});
    } catch (error) {
      return done(error);
    }
  }));

  //This verifies that the token sent by the user is valid
  passport.use('jwt', new JWTstrategy({
    secretOrKey : secret,
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
  }, async (payload, done) => {
    try {
      //Pass the user details to the next middleware
      return done(null, payload.email);
    } catch (error) {
      console.log(error)
      done(error);
    }
  }));
}
