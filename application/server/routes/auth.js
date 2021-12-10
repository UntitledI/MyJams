const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const { getUserWithLoginCode } = require('../utils/getUser');
const ApiError = require('../error/ApiError')

router.post('/login', async function (req, res, next) {
    const loginCode = req.body.loginCode;
    if (!loginCode) {
        return next(ApiError.badRequest('loginCode is missing'));
    }

    const user = await getUserWithLoginCode(loginCode).then((doc) => {
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