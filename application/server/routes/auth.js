const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const ApiError = require('../error/ApiError');
const { getUserWithRefreshToken } = require('../utils/getUser');
const authenticateToken = require('../middlewares/authenticateToken');
const authenticateUser = require('../middlewares/authenticateUser');

router.post('/login', async function (req, res, next) {
    /*
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return next(ApiError.badRequest('refresh token is required'));
    }
    */

    await getUserWithRefreshToken(refreshToken).then((user) => {
        const userInfo = {
            spotifyId: user.spotifyId,
            email: user.email
        };
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
        return res.json({ token: accessToken });
    }).catch((error) => {
        return next(ApiError.internal('Could not find user'));
    })
});

router.get('/user', authenticateUser, function (req, res, next) {
    res.json(req.user);
});

router.get('/logout', authenticateUser, function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.status(200).json({ success: true });
});

module.exports = router;