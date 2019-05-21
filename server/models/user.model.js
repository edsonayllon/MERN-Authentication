const mongoose = require('mongoose');
const argon2 = require('argon2');

// If user does not validate their email within 24 hrs,
// their account will be deleted by default
const UserSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: true },
  local: {
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    passwordResetHash: { type: String },
    passwordResetExpiry: { type: Number },
    verified: { type: Boolean, default: false },
    emailVerificationHash: { type: String },
    emailVerificationExpiry: { type: Date, default: Date.now, expires: 86400 },
  }
});

// Argon2 is used to hash passwords instead of bcrypt https://password-hashing.net/
UserSchema.methods.isValidPassword = async function(password){
  const user = this;
  const verify = await argon2.verify(user.local.password, password);
  return verify;
}

module.exports = mongoose.model('user', UserSchema);
