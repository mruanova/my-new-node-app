# my-new-node-app

`mkdir my-new-node-app`

`cd my-new-node-app`

`npm init -y`

`node index.js`

`npm install jsonwebtoken`

A JSON Web Token (JWT) in Node.js is often used for authentication purposes. 
JWT is a compact, URL-safe means of representing claims between two parties. 
In the context of a Node.js application, 
JWTs can be used to securely transmit information between the client and server.

Here's a basic guide on how to generate and verify a JWT in Node.js:

1. Install the jsonwebtoken package

First, you'll need to install the jsonwebtoken package, 
which is commonly used to work with JWTs in Node.js.

`npm install jsonwebtoken`

2. Generate a JWT (Token Creation)

To generate a token, you'll typically create a payload 
(data you want to store inside the token) and sign it using a secret or a private key.

`const jwt = require('jsonwebtoken');`

// Create a payload (for example, user information)

`
const user = {
  id: 1,
  username: 'johndoe',
  email: 'johndoe@example.com'
};
`

// Define a secret key (this should be kept safe and secure)

`const secretKey = 'your_secret_key';`

// Generate a JWT

`const token = jwt.sign(user, secretKey, { expiresIn: '1h' }); // token expires in 1 hour`

`console.log('Generated Token:', token);`

The jwt.sign() method takes in the payload (user object), the secret key (secretKey), 
and options such as the expiration time (expiresIn: '1h').

3. Verify a JWT (Token Verification)

To verify the authenticity of the token on the server side 
(for example, during a protected route request), you can use jwt.verify().

// Assume `token` is the JWT received from the client

`
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Token verification failed:', err.message);
  } else {
    console.log('Decoded Token:', decoded);
    // You can now access `decoded` which contains the original payload data (like user id, username, etc.)
  }
});
`

If the token is valid, jwt.verify() will return the decoded payload 
(the original data), otherwise, it will throw an error (e.g., expired token, invalid signature).

4. Middleware Example for Express.js

If you're using Express.js, you can create middleware to protect routes using JWTs:

`const express = require('express');`

`const jwt = require('jsonwebtoken');`

`const app = express();`

`const secretKey = 'your_secret_key';`

// Middleware to authenticate requests

`const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid Token');
    }
    req.user = decoded;
    next();
  });
};
`

// Attach the decoded token to the request

// Protected route

`
app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route. Your token is valid.');
});
`

// Start server

`
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
`

Explanation:

Sign the token: 

The server creates a token containing user data and sends it to the client after a successful login or registration.

Send the token: 

The client stores the token 
(e.g., in local storage or cookies) and sends it with subsequent requests in the Authorization header.

Verify the token: 

The server checks the token's validity for each protected request.