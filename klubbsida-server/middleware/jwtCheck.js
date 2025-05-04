const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: 'https://localhost:5173/.well-known/jwks.json'
  }),
  audience: 'klubbsida.onrender.com/api',
  issuer: 'https://localhost:5173/',
  algorithms: ['HS256'],
});

module.exports = jwtCheck;