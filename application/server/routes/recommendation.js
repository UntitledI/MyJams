const axios = require('axios');
var express = require('express');
const app = express();
const router = express.Router();
const getPreferences = require('../utils/getPreferences');
const getAccessToken = require('../utils/getAccessToken');
const updateAccessToken = require('../utils/updateAccessToken');


router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS,GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Content-Length");
  next();
});

router.get('/get', async function (req, res) {
  //call db for user preferences and token
  const url = 'https://api.spotify.com/v1/recommendations';
  const token = await getAccessToken(req.query.spotifyId);
  const preferencesArr = await getPreferences(req.query.spotifyId);
  let spotifyRequest = url + `?market=US&`;
  let preferenceObj;

  // Make sure token and preferences actually exist before proceeding
  if (!token || token === undefined) {
    console.log("Unable to find user's token!");
    return res.status(401).json({
      success: false,
      message: 'Could not find user token'
    });
  } else if (!preferencesArr || preferencesArr.length == 0) {
    console.log("Unable to find user preferences!");
    return res.status(401).json({
      success: false,
      message: 'Could not find user preferences'
    });
  }

  // Take the first preference object for now. Will need to change this!
  preferenceObj = preferencesArr[0];
  const seedGenres = `seed_genres=${preferenceObj.seed_genres}&`;
  const targetEnergy = `target_energy=${preferenceObj.target_energy}&`;
  const targetPopularity = `target_popularity=${preferenceObj.target_popularity}&`;
  const targetAcousticness = `target_acousticness=${preferenceObj.target_acousticness}&`;
  const limit = 'limit=10';
  spotifyRequest += seedGenres + targetEnergy + targetPopularity + targetAcousticness + limit;

  // Make request
  let songArray;

  try {
    songArray = await getRecommendations(token, spotifyRequest, req)
  } catch (e) {
    throw (e)
  }

  res.send(songArray);
})

async function getRecommendations(token, spotifyRequest, req) {
  let data;

  data = await axios.get(spotifyRequest, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    return res.data
  }).catch(async (error) => {
    if (error.response.status == 401) { // expired access token
      console.log('expired access token');
      token = await updateAccessToken(req.query.spotifyId);
      // try getting recommendations again
      return await axios.get(spotifyRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then((res) => {
        return res.data;
      })
    } else {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    }
  })

  return convertToArray(data, token);
}

async function convertToArray(data, token) {
  let songArr = [];
  for (let i = 0; i < data.tracks.length; i++) {
    const trackURL = data.tracks[i].external_urls.spotify;
    const songName = data.tracks[i].name;
    const trackId = data.tracks[i].id;
    const artistId = data.tracks[i].album.artists[0].id;
    const albumCover = data.tracks[i].album.images[0].url;
    let artistNames = '';
    let albumName = '';
    let genres = '';

    const artist = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    for (let j = 0; j < data.tracks[i].album.artists.length; j++) {
      if (j >= data.tracks[i].album.artists.length - 1)
        artistNames += data.tracks[i].album.artists[j].name;
      else artistNames += data.tracks[i].album.artists[j].name + ', ';
    }

    for (let j = 0; j < artist.data.genres.length; j++) {
      if (j >= artist.data.genres.length - 1)
        genres += artist.data.genres[j];
      else genres += artist.data.genres[j] + ', ';
    }

    if (data.tracks[i].album.album_type === 'ALBUM') {
      albumName = data.tracks[i].album.name;
    }

    songArr.push({
      "id": trackId,
      "name": songName,
      "artist": artistNames,
      "album": albumName,
      "image": albumCover,
      "url": trackURL,
      "genre": genres
    });
  }

  return songArr;
}

module.exports = router;
