const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/', function(req, res, next) {
  console.log(req.email);
  User.findOne({ 'local.email': req.email});
  res.status(200)
});

module.exports = router;
