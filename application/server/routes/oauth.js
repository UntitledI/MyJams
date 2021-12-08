
const express = require('express');
const router = express.Router();
const passport = require('../passport/spotify');

const scopes = ('user-read-private user-read-email');
const showDialog = true;

router.get('/spotify', passport.authenticate('spotify', { scope: scopes, showDialog: showDialog }));

router.get('/spotify/callback',
 passport.authenticate('spotify', { failureRedirect: process.env.CLIENT_URL, successRedirect: process.env.CLIENT_URL, session: true })
);

module.exports = router;