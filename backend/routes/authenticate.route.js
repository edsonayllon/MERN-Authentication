const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config')
const secret = config.TOKEN_SECRET;


router.post('/', function(req, res){
  User.findOne({email: req.body.email})
  .exec()
  .then(function(user) {
    bcrypt.compare(req.body.password, user.password, function(err, result){
      if(err) {
        return res.status(401).json({
          message: 'Wrong Username or Password',
          success: false
        });
      }
      if(result) {
        const JWTToken = jwt.sign({
          email: user.email,
          _id: user._id
        }, secret , {
          // Note: If dealing with sensitive data, such as money/banking,
          // set the token to expire every hour, else, expire every month
          expiresIn: '1m'
        });
        return res.status(200).json({
          message: 'Login Successful',
          success: true,
          token: JWTToken
        });
      }
      return res.status(401).json({
        message: 'Wrong Username or Password',
        success: false
      });
     });
    })
    .catch(error => {
      res.status(401).json({
         error: error,
         message: 'User does not exist, please register an account'
    });
  });;
});

module.exports = router;
