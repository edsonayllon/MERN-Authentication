const express = require('express');
const router = express.Router();
const checkHeader = require('../middleware');
const jwt = require('jsonwebtoken');
const config = require('../config')
const secret = config.TOKEN_SECRET;

router.get('/', checkHeader, function(req, res, next) {
  const bearer = req.headers['authorization'].split(' ');
  const token = bearer[1];
  jwt.verify(token, secret, (err, decoded) => {
     if(err){
       //If error send Forbidden (403)
       console.log('ERROR: Could not connect to the protected route');
       res.sendStatus(403);
     } else {
       //If token is successfully verified, we can send the autorized data
       res.send('The password is potato');
       console.log('SUCCESS: Connected to protected route');
     }
  })
});

module.exports = router;
