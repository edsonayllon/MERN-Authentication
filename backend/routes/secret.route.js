const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
   res.send('You are logged in, and have access to this restricted content');
   console.log('SUCCESS: Connected to protected route');
});

module.exports = router;
