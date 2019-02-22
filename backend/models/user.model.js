// User Schema holds user password and email
const mongoose = require('mongoose');
const argon2 = require('argon2');

const UserSchema = new mongoose.Schema({
  local: {
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    passwordResetHash: { type: String },
    passwordResetExpiry: { type: Number },
    verified: { type: Boolean, default: false },
    emailVerificationHash: { type: String },
    emailVerificationExpiry: { type: Date, default: Date.now, expires: 90 },
  }
});

UserSchema.methods.isValidPassword = async function(password){
  const user = this;
  console.log(password)
  const verify = await argon2.verify(user.local.password, password);
  return verify;
}

module.exports = mongoose.model('user', UserSchema);
