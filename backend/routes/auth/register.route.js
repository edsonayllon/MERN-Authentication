const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', async (req, res, next) => {
  passport.authenticate('local-register', { session : false },
  async (err, user, info) => {
    console.log(info);
    try {
      if(err || !user){
        const error = new Error('An Error occured');
        return res.status(400).send(info);
        return next(error);
      } else {
        return res.status(200).json({
          message : info.message,
          user : req.user
        });
      }
    } catch (error) {
      return res.status(400).send(info);
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
