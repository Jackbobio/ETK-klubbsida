function logRequest(req, res, next) {
    // Log the Authorization header and any other interesting info
    console.log("Authorization header:", req.headers.authorization);
    next();
  }
  module.exports = logRequest;