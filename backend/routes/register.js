var express = require('express');
var router = express.Router();

//import user schema
const User = require('../models/User.js');

// POST route to register a user
router.post('/', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

module.exports = router;
