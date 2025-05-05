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

    // Extract permissions from the auth object
    const permissions = req.auth.payload.permissions || [];
    console.log("Permissions:", permissions);

    //console.log("User roles:", roles);
    
    // Check if the user has the Administrator permission
    if (Array.isArray(req.auth.permissions) && permissions.includes("admin:all")) {
        next();
    } else {
        return res.status(403).json({
            error: "Forbidden",
            message: "Access denied. Administrator role required."
        });
    }
}

module.exports = checkAdminRole;