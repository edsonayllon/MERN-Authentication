const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const mailService = require('../../services/mail.service');
const userService = require('../../services/user.service');

router.get('/', async (req, res) => {
  console.log(req.query)
  console.log(req.query.token);
  console.log(req.query.user);
  const result = await userService.checkPasswordResetToken(
    decodeURIComponent(req.query.token),
    req.query.user
  )
  console.log(result);
  if (!(result.verified)){
    res.json({
      message: result.info,
      verified: result.verifed
    });
  }
  if (result.verified) {
    res.render('new-password', { email: req.query.email, code: req.query.code })
  } else {
    res.render('reset-password', { message: result.info })
  }
})

module.exports = router;
