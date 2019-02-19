const crypto = require('crypto');
//const argon2 = require('argon2');

module.exports.generatePasswordResetToken = (email) => {
  let token = crypto.randomBytes(32).toString('base64')
  return token;
}
