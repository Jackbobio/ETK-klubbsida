// const { expressjwt: jwt } = require('express-jwt');
// const { jwt } = require('jwks-rsa');
const { auth } = require('express-oauth2-jwt-bearer');

/**
 * JWT authentication middleware
 * Verifies that incoming requests have a valid JWT token from Auth0
 * This middleware should be applied to all routes that require authentication¨¨
 */



const jwtCheck = auth({
  audience: 'klubbsida.onrender.com/api',
  issuerBaseURL: 'https://dev-nwurgok5vi3aouh3.eu.auth0.com/',
  tokenSigningAlg: 'RS256'
});


// const jwtCheck = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksUri: 'https://dev-nwurgok5vi3aouh3.eu.auth0.com/.well-known/jwks.json'
//   }),
//   audience: ['klubbsida.onrender.com/api', 'https://dev-nwurgok5vi3aouh3.eu.auth0.com/userinfo'], // <-- this should match ONE of the aud fields
//   issuer: 'https://dev-nwurgok5vi3aouh3.eu.auth0.com/',
//   algorithms: ['RS256'],
// });

module.exports = jwtCheck;  