const jwt = require('jsonwebtoken');
 // Import the secret key using setup.js to generate a random string of bytes (for a secret key)
 const { secretKey } = require('../setup.js');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  //EDIT
  const { secretKey } = require('../setup.js');
  if (token) {
    try {
      const decodedToken = jwt.verify(token, secretKey);
      req.userId = decodedToken.id;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
