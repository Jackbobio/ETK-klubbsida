/**
 * Admin role verification middleware
 * Checks if the authenticated user has the Administrator role
 * This middleware should be applied after the JWT authentication middleware
 */
function checkAdminRole(req, res, next) {
    // Make sure we have auth object from the JWT middleware
    console.log("Auth object in checkAdminRole:", req.auth);

    if (!req.auth) {
        return res.status(401).json({ 
            error: "Authentication required",
            message: "You must be logged in to access this resource" 
        });
    }

    // Extract roles from the auth object
    // The namespace should match what's configured in Auth0
    const namespace = "https://klubbsida.onrender.com/roles";
    const roles = req.auth[namespace] || [];
    
    console.log("User roles:", roles);
    
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