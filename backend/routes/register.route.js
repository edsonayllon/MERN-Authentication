const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const saltRounds = 10;

// POST route to register a user
router.post('/', function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash){
    if (err || req.body.password === "") {
      return res.status(400).json({
        error: err,
        message: 'Password required'
      });
    } else if (req.body.password != req.body.passwordConfirm ) {
      return res.status(400).json({
        error: err,
        message: 'Passwords must match'
      });
    } else {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save().then(function(result) {
        console.log(result);
        res.status(200).json({
          message: 'Account successfully created. Please login'
        });
      }).catch(error => {
        if (req.body.email === ""){
          res.status(400).json({
            error: err,
            message: 'Email required'
          });
        } else{
          res.status(400).json({
            error: err,
            message: 'Account with that Email already exists'
          });
        }
      });
    }
  });
});

module.exports = router;
