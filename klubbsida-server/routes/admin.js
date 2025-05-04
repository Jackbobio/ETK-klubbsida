const express = require('express');
const router = express.Router();
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