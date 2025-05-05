const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');

// Fill in these EXACT values from your actual Auth0 dashboard/token:
const audience = 'klubbsida.onrender.com/api';
const issuerBaseURL = 'https://dev-nwurgok5vi3aouh3.eu.auth0.com/';

const jwtCheck = auth({
  audience,
  issuerBaseURL
});

const app = express();

// Add logging
app.get('/test', jwtCheck, (req, res) => {
    console.log('req.headers:', req.headers);
  console.log('req.auth:', req.auth); // <- This is where JWT payload will be!
  res.json({ auth: req.auth });
});

// Error handler
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.error('JWT verification error:', err);
    return res.status(401).json({ error: 'Invalid token', details: err.message });
  }
  next(err);
});

app.listen(3333, () => {
  console.log('Listening on 3333');
});