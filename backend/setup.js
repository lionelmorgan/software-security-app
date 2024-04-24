const crypto = require('crypto');

// Generate a random string of bytes (sufficient for a secret key)
const secretKey = crypto.randomBytes(32).toString('hex'); // Generates a 64-character hexadecimal string (32 bytes)

console.log('Generated Secret Key:', secretKey);

module.exports = {
  secretKey: secretKey
};