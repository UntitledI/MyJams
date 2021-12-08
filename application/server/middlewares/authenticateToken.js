const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError');

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return next(ApiError.unauthorized('Unauthorized access. Missing token'));

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return next(ApiError.forbidden('Invalid token'));
        req.user = user;
        return next();
    })
}