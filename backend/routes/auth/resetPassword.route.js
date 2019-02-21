const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const mailService = require('../../services/mail.service');
const userService = require('../../services/user.service');

router.get('/', async (req, res) => {
  const result = await userService.checkPasswordResetToken(
    decodeURIComponent(req.query.token),
    req.query.user
  );
  console.log(result);
  if (!(result.verified)) {
    res.json({
      message: result.info,
      verified: result.verifed
    });
  }
})

router.post('/', async (req, res) => {
  try {
    const result = await userService.checkPasswordResetToken(
      decodeURIComponent(req.body.token),
      req.body.email
    );
    if (result.verified) {
      const resetUser = await userService.resetPassword(
        req.body.email,
        req.body.password
      );
      if (resetUser) {
        res.status(200).json({
          message: "Your password has been reset"
        });
      } else  {
        res.status(403).json({
          message: 'Error resetting user password'
        });
      }
    }
  } catch (err) {
    res.status(403).json({
      message: 'Error resetting user password'
    });
  }

})

module.exports = router;
