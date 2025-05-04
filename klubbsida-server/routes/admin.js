const express = require('express');
const router = express.Router();
const jwtCheck = require('../middleware/jwtCheck');
const checkAdminRole = require('../middleware/roleCheck');

/**
 * Admin routes
 * All routes in this file require authentication and admin role
 */

// Apply JWT authentication and admin role check to all admin routes
router.use(jwtCheck, checkAdminRole);

// Test route to verify admin access
router.get('/', (req, res) => {
    res.json({ 
        message: 'Admin access verified',
        user: req.user.sub
    });
});

// Add more admin routes here...

module.exports = router;