const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.SECRET_KEY;

router.post('/', function (req, res, next) {
  passport.authenticate('local-login', async (err, user, info) => {
    try {
      if(err || !user){
        const error = new Error('An Error occured')
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        const body = { _id : user.local._id, email : user.local.email };
        const token = jwt.sign({ body }, secret);
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
