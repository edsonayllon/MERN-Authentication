const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config')
const secret = config.SECRET_KEY;

router.get('/', function(req, res, next) {
  jwt.verify(req.token, secret, (err, decoded) => {
    if(err){
      res.sendStatus(403);
    } else {
      //If token is successfully verified, we can send the autorized data
      res.sendStatus(200);
    }
  })
});

module.exports = router;
