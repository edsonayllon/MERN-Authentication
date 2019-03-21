const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user.model');

router.get('/', function(req, res, next) {
  passport.authenticate('jwt', { session : false }, async (err, payload) => {
    console.log(payload)
    const user = await User.findOne({ '_id': payload._id });
    console.log(user)
    res.send(
`You are logged in, and have access to this restricted content.
You can log out in User Settings`
    );
    console.log('SUCCESS: Connected to protected route');
  }) (req, res, next);
});

module.exports = router;
