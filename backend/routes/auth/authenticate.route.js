const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const secret = config.AUTH_ECRET_KEY;
const tokenExpiration = "1m"; // set how long user will be logged in

router.post('/', function (req, res, next) {
  passport.authenticate('local-login', async (err, user, info) => {
    try {
      if(err || !user){
        const error = new Error('An Error occured');
        return res.status(401).send(info);
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        console.log(error);
        if (user.local.verified === true) {
          const token = jwt.sign({
            _id : user._id
          }, secret, { expiresIn: tokenExpiration });
          return res.status(200).json({
            message: 'Login successful',
            token: token
          });
        } else {
          res.status(401).json({
            message: 'Please verify your email address',
          });
        }
      });
    } catch (error) {
      console.log(error)
      return res.status(401).send(info);
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
