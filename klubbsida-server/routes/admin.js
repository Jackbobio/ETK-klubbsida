const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: 'dev-nwurgok5vi3aouh3.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'klubbsida.onrender.com/api',
  issuer: 'dev-nwurgok5vi3aouh3.eu.auth0.com',
  algorithms: ['RS256'],
});

function checkAdminRole(req, res, next) {
    const roles = req.user["https://localhost:5173/roles"] || [];
    if (roles.includes("Administrator")) {
        next();
    } else{
        return res.status(403).send("Access denied. Admin role required.");
    }
    
}

router.get('/', jwtCheck, checkAdminRole, (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

module.exports = router;