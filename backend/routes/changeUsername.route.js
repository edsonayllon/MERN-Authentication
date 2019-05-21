const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user.model');
const userService = require('../services/user.service');

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findOne({ '_id': req._id });
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
})


router.post('/', async (req, res, next) => {
  try {
    const success = await userService.changeUsername(
      req._id,
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
})

module.exports = router;
