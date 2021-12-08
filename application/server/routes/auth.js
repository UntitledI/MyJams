const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const { getUserWithRefreshToken } = require('../utils/getUser');
const ApiError = require('../error/ApiError')

router.post('/login', async function (req, res, next) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return next(ApiError.badRequest('refreshToken is missing'));
    }

    const user = await getUserWithRefreshToken(refreshToken).then((doc) => {
        return {
            spotifyId: doc.spotifyId,
            email: doc.email,
            name: doc.name,
            image: doc.image,
            followers: doc.followers
        };
    }).catch((err) => {
        return next(ApiError.internal('Something went wrong'))
    });

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ token: accessToken });
});

router.get('/user', authenticateToken, function (req, res, next) {
    res.json({ user: req.user });
});

router.delete('/logout', authenticateToken, function (req, res, next) {
    res.status(200).json({ success: true });
});

module.exports = router;