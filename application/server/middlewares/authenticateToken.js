const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(ApiError.unauthorized('Unauthorized access'));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return next(ApiError.forbidden('Invalid authorization'));
        req.user = user;
        next();
    });
}