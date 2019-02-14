const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.sendStatus(200);
});

module.exports = router;
