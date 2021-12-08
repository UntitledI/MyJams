const ApiError = require('./ApiError');

function apiErrorHandler(err, req, res, next) {
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.code).json(err.message);
    } else res.status(500).json('Internal server error');
}

module.exports = apiErrorHandler;