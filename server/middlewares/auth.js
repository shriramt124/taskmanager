const jwt = require("jsonwebtoken")

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    try {
        // Extract token from the Authorization header
        console.log(req.headers);

        const token = authHeader && authHeader.split(' ')[1];
        console.log("is authenticated running");
        // If no token is provided, return 401 Unauthorized
        console.log(token);
        if (!token) {
            return res.status(401).json({ success: false, message: 'Bearer token missing' });
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        // If token is invalid or expired, return 403 Forbidden
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
}

module.exports = isAuthenticated;