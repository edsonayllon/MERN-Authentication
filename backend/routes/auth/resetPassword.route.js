const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const mailService = require('../../services/mail.service');
const userService = require('../../services/user.service');

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({
      'local.passwordResetHash': req.body.passwordResetToken,
      'locol.resetPasswordExpires': {
        [Op.gt]: Date.now()
      },
    });
    if (user) {
      let passToken = await userService.generatePasswordResetToken(user.local.email)
      await mailService.sendPasswordReset(req.body.email, passToken)
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
