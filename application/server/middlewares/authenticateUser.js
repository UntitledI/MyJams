const ApiError = require('../error/ApiError');

module.exports = function authenticateUser(req, res, next) {
    req.user ? next() : next(ApiError.unauthorized('Unauthorized access'));
}