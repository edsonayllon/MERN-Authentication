const checkHeader = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
      //If header is undefined return Forbidden (403)
      res.sendStatus(403).json({
        message: 'middleware failed'
      })
    }
}

module.exports = checkHeader;
