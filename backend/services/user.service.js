const crypto = require('crypto');
const argon2 = require('argon2');
const User = require('../models/user.model');

module.exports.generatePasswordResetToken = async (email) => {
  try {
    const user = await User.findOne({ 'local.email': email });
    if (!user) {
      throw new Error('error getting user')
    } else {
      let token = await crypto.randomBytes(32).toString('base64')
      let hash = await argon2.hash(token, { type: argon2.argon2id })
      user.local.passwordResetHash = hash;
      user.local.passwordResetExpiry = new Date().valueOf() + (1000 * 60 * 60) // 60 minutes
      await user.save()
      return token;
    }
  } catch (err) {
    throw new Error('error getting user')
  }
}

module.exports.checkPasswordResetToken = async (token, email) => {
  try {
    const user = await User.findOne({ 'local.email': email });
    if (user.local.passwordResetExpiry > new Date().valueOf()) {
      const verified = await argon2.verify(user.local.passwordResetHash, token)
      let info = verified
        ? 'Valid password reset token'
        : 'Invalid password reset token'
      return ({ verified, info })
    } else {
      return ({
        verified: false,
        info: 'Your password reset token has expired. Please request another'
      })
    }
  } catch (err) {
    console.log('error from catch statement');
    throw new Error('error getting user');
  }
}

module.exports.resetPassword = async (email, password) => {
  try {
    const user = await User.findOne({ 'local.email': email });
    if (!user) {
      throw new Error('error getting user')
      return false;
    } else {
      let passHash = await argon2.hash(password, {type: argon2.argon2id});
      user.local.password = passHash;
      user.save()
      return true;
    }
  } catch (err) {
    console.log('error from catch')
    throw new Error('error getting user')
    return false;
  }
}

module.exports.verifyEmailAddress = async (token, email) => {
  try {
    const user = await User.findOne({'local.email': email});
    // If verfication time has expired, the user will automatically be
    // deleted from the database within one minute of expiration time
    if (user.local.verified === true) {
      return {
        verified: true,
        message: 'E-mail already verified'
      }
    }
    try {
      const verified = await argon2.verify(
        user.local.emailVerificationHash,
        token
      );
      console.log('verified fro argon2');
      console.log(verified);
      if (verified) {
        user.local.emailVerificationExpiry = undefined;
        user.local.emailVerificationHash = undefined;
        user.local.verified = true;
        user.save();
        return {
          verified: true,
          message: 'E-mail successfully verified'
        }
      } else {
        return {
          verified: false,
          message: 'Invalid email verification token provided'
        }
      }
    } catch (err) {
      console.log(err)
      return {
        verified: false,
        message: 'Verification window has expired, please register a new account'
      }
    }
  } catch (err) {
    console.log(err);
    return {
      verified: false,
      message: 'Verification window has expired, please register a new account'
    };
  }
};


module.exports.isValidPassword = async function(email, password){
  const user = await User.findOne({'local.email': email})
  const verify = await argon2.verify(user.local.password, password);
  return verify;
}
