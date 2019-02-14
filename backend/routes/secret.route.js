const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
   res.send('The password is potato');
   console.log('SUCCESS: Connected to protected route');
});

module.exports = router;
