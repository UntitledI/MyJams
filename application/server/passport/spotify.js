require('dotenv').config();
const crypto = require('crypto');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const { getUserWithSpotifyId } = require('../utils/getUser');
const addOrFindUser = require('../utils/addOrFindUser');

const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
    // callbackURL: process.env.CLIENT_URL
};

const strategy = new SpotifyStrategy(spotifyConfig, (accessToken, refreshToken, expires_in, profile, done) => {
    const spotifyId = profile.id;
    const email = profile.emails && (profile.emails[0] && profile.emails[0].value);
    const name = profile.displayName;
    const image = profile.photos && (profile.photos[0] && profile.photos[0].value);
    const followers = profile.followers;
    const loginCode = crypto.randomBytes(32).toString('hex');

    addOrFindUser(spotifyId, email, name, followers, image, loginCode, accessToken, refreshToken, expires_in).then((user) => {
        return done(null, user)
    }).catch((e) => {
        console.log(e)
        return done(e, null)
    })
});

passport.use(strategy);

module.exports = passport;
