const express = require('express');
const router = express.Router();
const { checkJwt } = require('../middleware/jwtCheck');
const { checkAdminRole } = require('../middleware/roleCheck');

router.get('/', checkJwt, checkAdminRole, (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});