const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/', function(req, res) {
  console.log(req.body.email);
  User.findOne({ 'local.email': req.body.email });
  return res.status(200).json({
    message: 'Success Message',
  });
});

module.exports = router;
