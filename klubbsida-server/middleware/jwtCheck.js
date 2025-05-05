const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

/**
 * JWT authentication middleware
 * Verifies that incoming requests have a valid JWT token from Auth0
 * This middleware should be applied to all routes that require authentication¨¨
 */


const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: 'https://dev-nwurgok5vi3aouh3.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'klubbsida.onrender.com/api',
  issuer: 'https://dev-nwurgok5vi3aouh3.eu.auth0.com/',
  algorithms: ['RS256'],
});

module.exports = jwtCheck;  