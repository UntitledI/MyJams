const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const addPreferences = require('../utils/addPreferences');
const getPreferences = require('../utils/getPreferences');
const removePreferences = require('../utils/removePreferences');
const getCurrentPreference = require('../utils/getCurrentPreference');
const setCurrentPreference = require('../utils/setCurrentPreference');
const ApiError = require('../error/ApiError');

router.get('/get', authenticateToken, async function (req, res, next) {
  const spotifyId = req.user.spotifyId
  let preferences = [];

  // use spotify id to get list of preferences
  const _preferences = await getPreferences(spotifyId).then((preferences) => {
    return preferences;
  }).catch((error) => {
    console.error(error);
    return next(ApiError.internal('Something went wrong'));
  })
  // use spotify id to get user's current preference profile
  const currentPreference = await getCurrentPreference(spotifyId).then((preference) => {
    return preference;
  }).catch((error) => {
    console.error(error);
    return next(ApiError.internal('Something went wrong'));
  })

  // prepare data to be sent back
  _preferences.forEach((preference) => {
    preferences.push({
      id: preference.id,
      name: preference.title || preference.seed_genres,
      seed_genres: preference.seed_genres,
      target_energy: preference.target_energy,
      target_popularity: preference.target_popularity,
      target_acousticness: preference.target_acousticness,
    })
  })

  // send data
  res.json({
    preferences: preferences,
    currentPreference: currentPreference
  })
});

router.post('/set', authenticateToken, function (req, res, next) {
  const spotifyId = req.user.spotifyId
  const preferenceId = req.body.preferenceId;

  if (!preferenceId) { // check that request is good
    console.log('No preference id found!');
    return next(ApiError.badRequest('preference id is required'));
  }

  setCurrentPreference(spotifyId, preferenceId).then((result) => {
    if (result) {
      return res.status(200);
    } else {
      return next(ApiError.badRequest('preference id did not yield results'));
    }
  }).catch((error) => {
    console.error(error);
    return next(ApiError.internal('Something went wrong'));
  });
});

router.post('/add', authenticateToken, function (req, res, next) {
  const spotifyId = req.user.spotifyId;

  // add new preference
  addPreferences(spotifyId, req.body).then(() => {
    return res.status(200);
  }).catch((error) => {
    console.error(error);
    return next(ApiError.internal('Something went wrong'));
  })
});

router.post('/delete', authenticateToken, function (req, res, next) {
  const spotifyId = req.user.spotifyId;
  const preferenceId = req.body.preferenceId;

  if (!preferenceId) {
    console.log('No preference id found!');
    return next(ApiError.badRequest('preference id is required'));
  }

  // remove user's preference
  removePreferences(spotifyId, preferenceId).then(() => {
    return res.status(200);
  }).catch((error) => {
    console.error(error);
    return next(ApiError.internal('Something went wrong'));
  })
});

module.exports = router;
