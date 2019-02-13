require('dotenv').config({ path: 'variables.env' });

module.exports = {
  // 1. MongoDB
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/react-auth',

  // 2. JWT
  SECRET_KEY: process.env.SECRET_KEY || 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',

  // 3. Express Server Port
  PORT: process.env.PORT || 4000
};
