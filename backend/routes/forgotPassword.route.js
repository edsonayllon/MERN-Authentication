const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const mail = require('../services/mail.service');

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ 'local.email': req.body.email });
    if (user) {
      mail.sendPasswordReset(req.body.email)
      return res.status(200).json({
        message: `Email sent to ${req.body.email}`,
      });
    }
    if (!user) {
      return res.status(403).json({
        message: 'User not found',
      });
    }

  } catch (err) {
    return res.status(400).json({
      message: 'Error occured',
    });
  }
  console.log(req.body.email);

});

module.exports = router;
