const express = require('express');
const router = express.Router();
const passport = require('passport');
const mailService = require('../../services/mail.service');
const userService = require('../../services/user.service');

router.post('/', async (req, res, next) => {
  passport.authenticate('local-register', { session : false },
  async (err, user, info) => {
    console.log(info);
    console.log(user);
    console.log(err);
    try {
      if (user) {
        console.log('this code is running')
        let token = info.emailVerificationToken;
        await mailService.sendEmailVerification(req.body.email, token);
        return res.status(200).json({
          message : info.message,
          user : req.user
        });
      } else {
        const error = new Error('An Error occured');
        return res.status(400).send(info);
        return next(error);
      }
    } catch (error) {
      console.log(error)
      return res.status(400).send(info);
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
