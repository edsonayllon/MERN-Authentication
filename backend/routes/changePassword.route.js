const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user.model');
const userService = require('../services/user.service');

router.post('/', function (req, res, next) {
  passport.authenticate('jwt', { session : false }, async (err, payload) => {
    try {
      const user = await User.findOne({ '_id': payload._id });
      const validated = await user.isValidPassword(req.body.oldpassword);
      if (validated) {
        const resetUser = await userService.resetPassword(
          user.local.email,
          req.body.newpassword
        );
        if (resetUser) {
          res.status(200).json({
            message: "Your password has been reset"
          });
        } else {
          res.status(403).json({
            message: 'Error resetting user password'
          });
        }
      } else {
        res.status(403).json({
          message: 'Invalid credentials'
        });
      }
    } catch (err) {
      console.log(err);
      res.status(403).json({
        message: 'Error resetting user password'
      });
    }
  }) (req, res, next);
})

module.exports = router;
