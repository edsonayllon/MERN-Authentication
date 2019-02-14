const config = require('./config');
const secret = config.TOKEN_SECRET;
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, secret, function(err, decoded) {
          if (err) {
            res.status(401).send('Unauthorized: Invalid token');
          } else {
            req.email = decoded.email;
            req._id = decoded._id;
            next();
          }
        })
    } else {
      //If header is undefined return Forbidden (403)
      console.log('middleware failed');
      res.sendStatus(403).json({
        message: 'middleware failed'
      })
    }
}

module.exports = checkToken;
