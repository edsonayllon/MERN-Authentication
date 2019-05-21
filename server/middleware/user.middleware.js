const passport = require('passport');
const User = require('../models/user.model');

module.exports.jwt = function (req, res, next) {
  passport.authenticate('jwt', { session : false }, async (err, payload) =>{
    req._id = payload._id;
    if (payload) next();
  }) (req, res, next)
}
