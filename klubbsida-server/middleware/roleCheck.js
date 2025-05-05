/**
 * Admin role verification middleware
 * Checks if the authenticated user has the Administrator role
 * This middleware should be applied after the JWT authentication middleware
 */
function checkAdminRole(req, res, next) {
    // Make sure we have a user object from the JWT middleware
    console.log("User object in checkAdminRole:", req.user);

    if (!req.user) {
        return res.status(401).json({ 
            error: "Authentication required",
            message: "You must be logged in to access this resource" 
        });
    }

    // Extract roles from the user object
    // The namespace should match what's configured in Auth0
    const roles = req.user["https://localhost:5173/roles"] || [];
    
    // Check if the user has the Administrator role
    if (roles.includes("Administrator")) {
        next();
    } else {
        return res.status(403).json({
            error: "Forbidden",
            message: "Access denied. Administrator role required."
        });
    }
}

module.exports = checkAdminRole;