const express = require('express');
const router = express.Router();
const userService = require('../../services/user.service');

router.get('/', async (req, res) => {
  const result = await userService.verifyEmailAddress(
    decodeURIComponent(req.query.token),
    req.query.user
  );
  console.log('Verification request: ');
  console.log(result);
  res.json(result);
});

module.exports = router;
