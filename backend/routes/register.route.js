const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user.model');

// POST route to register a user
router.post('/', function(req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash){
      if(err || req.body.password === "") {
         return res.status(400).json({
            error: err,
            message: 'Password required'
         });
      }
      else {
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
            res.status(400).json({
               error: err,
               message: 'Username required'
            });
         });
      }
   });
});

module.exports = router;
