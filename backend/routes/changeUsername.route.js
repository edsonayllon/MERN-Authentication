const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user.model');
const userService = require('../services/user.service');

router.get('/', function (req, res, next) {
  passport.authenticate('jwt', { session : false }, async (err, payload) => {
    try {
      const user = await User.findOne({ '_id': payload._id });
      if (user.username) {
        res.status(200).json({
          username: user.username
        });
      } else {
        res.status(200).json({
          username: 'No username set'
        });
      }
    } catch (err) {
      console.log(err);
      res.status(403).json({
        username: 'Error finding user'
      });
    }
  }) (req, res, next);
})


router.post('/', function (req, res, next) {
  passport.authenticate('jwt', { session : false }, async (err, payload) => {
    try {
      const success = await userService.changeUsername(
        payload._id,
        req.body.newusername
      )
      if (success) {
        res.status(200).json({
          message: 'Username successfully updated'
        });
      } else {
        res.status(403).json({
          message: 'Username already exists'
        });
      }
    } catch (err) {
      console.log(err);
      res.status(403).json({
        message: 'Username already exists'
      });
    }
  }) (req, res, next);
})

module.exports = router;
