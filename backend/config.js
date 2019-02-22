require('dotenv').config({ path: 'variables.env' });

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/react-auth',
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY || 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',
  PORT: process.env.PORT || 4000,
  MAIL_USER: process.env.MAIL_USER || "noreply@example.com",
  MAIL_PASS: process.env.MAIL_PASS || "secret-password",
  APP_NAME: process.env.APP_NAME || "Enter Your Company Name Here"
};
