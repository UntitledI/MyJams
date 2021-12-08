const express = require('express');
const router = express.Router();
const passport = require('../passport/spotify');

const scopes = ('user-read-private user-read-email');
const showDialog = true;

router.get('/spotify', passport.authenticate('spotify', { scope: scopes, showDialog: showDialog }));

router.get('/spotify/callback',
 passport.authenticate('spotify', { failureRedirect: process.env.CLIENT_URL }),
 function (req, res) {
    const queryParams = '?loginCode=' + req.user.loginCode;
    res.redirect(process.env.CLIENT_URL + queryParams)
 }
);

module.exports = router;