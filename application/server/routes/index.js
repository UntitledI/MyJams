const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const addNewUser = require('../utils/addNewUser');
const findUser = require('../utils/findUser');
const session = require('express-session');
require('dotenv').config();
const port = process.env.PORT;

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
  console.log('serialized user: ' + user.spotifyId)
  done(null, user.spotifyId);
});

passport.deserializeUser(function (id, done) {
  findUser(id).then((user) => {  
    console.log('deserialized')
    console.log(user)
    done(null, user)
  }).catch((e) => {
    done(e, null)
  })
});

app.use(session({secret: process.env.ACCESS_TOKEN_SECRET, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy)

const isAuthenticated = (req,res,next) => {
	console.log(req.user);
	if(req.user) {
		return next();
	} else {
		return res.status(401).json({
			error: 'User not authenticated'
		});
	}
};

/* GET home page. */
app.get('/', function (req, res, next) {
  return res.send(addNewUser('email', 'spotifyId', 'accessToken', 'refreshToken', 'expires_in'))
});

app.get('/login', passport.authenticate('spotify', { scope: scopes, showDialog: showDialog }))

app.get('/oauth/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
)

app.get('/checkauth', isAuthenticated, function (req, res) {

	res.status(200).json({
		status: 'Login successful!'
	});
});


app.listen(port, () => {
})

module.exports = router;
