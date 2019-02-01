const express = require('express');
const router = express.Router();
const withAuth = require('../middleware');

router.get('/', withAuth, function(req, res, next) {
  res.send('The password is potato');
});

module.exports = router;
