const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');
const addPreferences = require('../utils/addPreferences');
const getPreferences = require('../utils/getPreferences');
const removePreferences = require('../utils/removePreferences');
const getCurrentPreference = require('../utils/getCurrentPreference');
const setCurrentPreference = require('../utils/setCurrentPreference');
const ApiError = require('../error/ApiError');

router.get('/get', authenticateUser, async function (req, res, next) {
  const spotifyId = req.user.spotifyId
  let preferences = [];

  // use spotify id to get list of preferences
  const _preferences = await getPreferences(spotifyId).then((preferences) => {
    return preferences;
  }).catch((error) => {
    console.log(error);
    res.status(500);
  })
  // use spotify id to get user's current preference profile
  const currentPreference = await getCurrentPreference(spotifyId).then((preference) => {
    return preference;
  }).catch((error) => {
    console.log(error);
    res.status(500);
  })

  // prepare data to be sent back
  for (let i = 0; i < _preferences.length; i++) {
    preferences.push({
      id: _preferences[i]._id,
      name: _preferences[i].seed_genres,
      seed_genres: _preferences[i].seed_genres,
      target_energy: _preferences[i].target_energy,
      target_popularity: _preferences[i].target_popularity,
      target_acousticness: _preferences[i].target_acousticness,
      current: _preferences[i]._id === currentPreference ? true : false
    });
  }

  // send data
  res.status(200).json({
    preferences: preferences
  })
});

router.post('/set', authenticateUser, function (req, res, next) {
  const spotifyId = req.body.spotifyId;
  const preferenceId = req.body.preferenceId;

  if (!spotifyId) { // check that request is good
    console.log('No spotify id found!');
    return res.status(400).json({
      success: false,
      message: 'Invalid parameters: spotify id is requred'
    });
  } else if (!preferenceId) {
    console.log('No preference id found!');
    return res.status(400).json({
      success: false,
      message: 'Invalid parameters: preference id is requred'
    });
  }

  setCurrentPreference(spotifyId, preferenceId).then((res) => {
    if (res) {
      res.status(200);
    } else {
      res.status(400).json({
        success: false,
        message: 'Preference was not found'
      });
    }
  }).catch((error) => {
    console.log(error);
    res.status(500);
  });
});

router.post('/add', authenticateUser, function (req, res, next) {
  const spotifyId = req.user.spotifyId;

  // add new preference
  addPreferences(spotifyId, req.body).then(() => {
    res.status(200);
  }).catch((error) => {
    console.log(error);
    res.status(500);
  })
});

router.post('/delete', authenticateUser, function (req, res, next) {
  const spotifyId = req.user.spotifyId;
  const preferenceId = req.body.preferenceId;

  if (!preferenceId) {
    console.log('No preference id found!');
    return res.status(400).json({
      success: false,
      message: 'Invalid parameters: preference id is requred'
    });
  }

  // remove user's preference
  removePreferences(spotifyId, preferenceId).then(() => {
    console.log('success');
    res.status(200);
  }).catch((error) => {
    res.status(500);
  })
});

module.exports = router;
