const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.SECRET_KEY;
const tokenExpiration = "1m";

router.post('/', function (req, res, next) {
  passport.authenticate('local-login', async (err, user, info) => {
    try {
      if(err || !user){
        const error = new Error('An Error occured')
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        console.log(user);
        const token = jwt.sign({
          _id : user._id,
          email : user.local.email
        }, secret, { expiresIn: tokenExpiration });
        return res.json({
          message: 'Login successful',
          token: token
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
