const crypto = require('crypto');
const argon2 = require('argon2');
const User = require('../models/user.model');

const generatePasswordResetToken = async (email) => {
  try {
    const user = await User.findOne({ 'local.email': email });
    if (!user) {
      throw new Error('error getting user')
    } else {
      let token = await crypto.randomBytes(32).toString('base64')
      let hash = await argon2.hash(token, { type: argon2.argon2id })
      user.local.passwordResetHash = hash;
      user.local.passwordResetExpiry = new Date().valueOf() + (1000 * 60 * 60) // 60 minutes
      user.save();
      return token;
    }
  } catch (err) {
    throw new Error('error getting user')
  }
}


const checkPasswordResetToken = async (token, email) => {
  try {
    const user = await User.findOne({ 'local.email': email });
    if (user) {
      if (user.passwordResetExpiry > new Date().valueOf()) {
        const verified = await argon2.verify(user.passwordResetHash, token)
        let info = verified
          ? 'Correct password reset token'
          : 'Incorrect password reset token'
        return ({verified, info})
      } else {
        console.log('expired');
        return ({
          verified: false,
          info: 'Your reset token has expired. Please request another'
        })
      }
    }
  } catch (err) {
    console.log('error from catch statement');
    throw new Error('error getting user');
  }

}


const resetPassword = async (email, password) => {
  try {
    const user = await User.findOne({ 'local.email': email });
    console.log(user);
    if (!user) {
      throw new Error('error getting user')
    } else {
      hash = await argon2.hash(password, {type: argon2.argon2id})
      // Hash the password with Argon2id: https://crypto.stackexchange.com/questions/48935/why-use-argon2i-or-argon2d-if-argon2id-exists?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
      user.passwordHash = hash;
      user.save()
      return user;
    }
  } catch (err) {
    console.log('error from catch')
    throw new Error('error getting user')
  }
}

const verifyEmailAddress = async (email, emailVerificationString) => {
  try {
    const user = await User.findOne({email: email});
      if (user.emailVerificationExpiry > new Date().valueOf()) {
        try {
          const verified = await argon2.verify(
            user.emailVerificationHash,
            emailVerificationString
          );
          console.log('verified fro argon2');
          console.log(verified);
          if (verified) {
            user.emailVerificationExpiry = null;
            user.emailVerificationHash = null;
            user.verified = true;
            user.save();
            return verified
          } else {
            return 'error verifying email address'
          }
        } catch (error) {
          console.log('error verifying email address');
          console.log(error);
          return error
        }
      } else {
        return 'Verification token has expired.';
      }
  } catch (err) {
    console.log(err);
    return 'Error verifiying email address';
  }
};

module.exports = {
  generatePasswordResetToken,
  checkPasswordResetToken,
  resetPassword,
  verifyEmailAddress,
}
