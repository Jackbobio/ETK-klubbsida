const express = require('express');
const router = express.Router();
const { checkJwt } = require('../middleware/jwtCheck');

function checkAdminRole(req, res, next) {
    const roles = req.user["https://localhost:5173/roles"] || [];
    if (roles.includes("Administrator")) {
        next();
    } else{
        return res.status(403).send("Access denied. Admin role required.");
    }
    
}

router.get('/', checkJwt, checkAdminRole, (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});