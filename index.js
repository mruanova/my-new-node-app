const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const PORT = 3000;
// Define a secret key (this should be kept safe and secure)
const secretKey = 'your_secret_key';
console.log('Secret Key:', secretKey);
// Create a payload (for example, user information)
const user = { id: 1, username: 'johndoe', email: 'johndoe@example.com' };
// Generate a JWT
const token = jwt.sign(user, secretKey, { expiresIn: '1h' }); // token expires in 1 hour
console.log('Generated Token:', token);
// Assume token is the JWT received from the client
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) { console.error('Token verification failed:', err.message); } else {
    // You can now accessdecodedwhich contains the original payload data (like user id, username, etc.)
    console.log('Decoded Token:', decoded);
  }
});
// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid Token');
    }
    req.user = decoded; // Attach the decoded token to the request
    next();
  });
};
// Protected route
app.get('/protected', authenticateToken, (req, res) => { res.send('This is a protected route. Your token is valid.'); });
// hello
app.get('/', (req, res) => {
  res.send(user);
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});