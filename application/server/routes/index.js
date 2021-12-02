const express = require('express');
const app = express();
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const addNewUser = require('../utils/addNewUser');
var preferenceRouter = require('./preferences');
var recommendationRouter = require('./recommendation');

require('dotenv').config();
const port = 3030;

const scopes = ('user-read-private user-read-email');
const showDialog = true;

const spotifyConfig = {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: process.env.REDIRECT_URI,
}

const strategy = new SpotifyStrategy(spotifyConfig, (accessToken, refreshToken, expires_in, profile, done) => {
  const spotifyId = profile.id
  const email = profile.emails[0].value

  addNewUser(email, spotifyId, accessToken, refreshToken, expires_in).then((user) => {
    return done(null, user)
  }).catch((e) => {
    console.log('test')
    console.log(e)
    return done(e, null)
  })

})

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(passport.initialize());
//app.use(passport.session());
app.use('/recommendation',recommendationRouter);
app.use('/preference',preferenceRouter);

passport.use(strategy)

/* GET home page. */
app.get('/', function (req, res, next) {
  return res.send(addNewUser('email', 'spotifyId', 'accessToken', 'refreshToken', 3600))
});

app.get('/login', passport.authenticate('spotify', { scope: scopes, showDialog: showDialog }))

app.get('/oauth/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
)


app.listen(port, () => {
  console.log(`home page listening at http://localhost:${port}`)
})

module.exports = router;
