const jwt = require('jsonwebtoken');

// Middleware function for token verification
function verify(req, res, next) {
  const authHeader = req.headers.token;

  if (authHeader) {
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        // Token is not valid
        res.status(403).json('Token is not valid!');
      }
      // Token is valid, set the user in the request object
      req.user = user;
      console.log(req.user);
      next();
    });
  } else {
    // No token provided
    return res.status(401).json('You are not authenticated!');
  }
}

module.exports = verify;
