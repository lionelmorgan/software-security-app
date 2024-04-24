const crypto = require('crypto');

// Generate a random string of bytes (sufficient for a secret key)
// Generates a 64-character hexadecimal string (32 bytes)
const secretKey = crypto.randomBytes(32).toString('hex'); 
console.log('Generated Secret Key:', secretKey);

module.exports = {
  secretKey: secretKey
};