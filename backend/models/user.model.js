// User Schema holds user password and email
const mongoose = require('mongoose');
const argon2 = require('argon2');

const UserSchema = new mongoose.Schema({
  local: {
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    passwordResetHash: { type: String },
    passwordResetExpiry: { type: Number }
  }
});

UserSchema.pre('save', async function(next){
  const user = this;
  const hash = await argon2.hash(this.local.password, { type: argon2.argon2id });
  this.local.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function(password){
  const user = this;
  const verify = await argon2.verify(user.local.password, password);
  return verify;
}

module.exports = mongoose.model('user', UserSchema);
