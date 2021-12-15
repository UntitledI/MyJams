const axios = require('axios');
var express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const getAccessToken = require('../utils/getAccessToken');
const updateAccessToken = require('../utils/updateAccessToken');
const getPreference = require('../utils/getPreference');
const getPreferences = require('../utils/getPreferences');
const getCurrentPreference = require('../utils/getCurrentPreference');
const ApiError = require('../error/ApiError');
const setCurrentPreference = require('../utils/setCurrentPreference');

router.get('/get', authenticateToken, async function (req, res, next) {
  //call db for user preferences and token
  const url = 'https://api.spotify.com/v1/recommendations';
  const token = await getAccessToken(req.user.spotifyId);
  const currentPreference = await getCurrentPreference(req.user.spotifyId);
  let spotifyRequest = url + `?market=US&`;
  let preferenceObj;
  
  // Make sure token and preferences actually exist before proceeding
  if (!token || token === undefined) {
    console.log("Unable to find user's token!");
    return next(ApiError.internal('Could not find info'));
  }
  if (!currentPreference) {
    console.log('spotifyId', req.user.spotifyId)
    // Take the first preference object if there is no preference set
    const preferencesArr = await getPreferences(req.user.spotifyId);

    if (!preferencesArr || preferencesArr.length == 0) {
      console.log("Unable to find user preferences!");
      return next(ApiError.internal('Could not find info'));
    } else {
      preferenceObj = preferencesArr[0];
    }
  } else {
    preferenceObj = await getPreference(currentPreference).then((preference) => {
      return preference
    }).catch((error) => {
      console.error(error);
      return next(ApiError.internal('Something went wrong'));
    });
  }

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
    return res.json(songArray);
  } catch {
    return next(ApiError.internal('Something went wrong....'))
  }
})

router.get('/getNew',async function(req,res){
  let currentPreferenceId = await getCurrentPreference(req.user.spotifyId);
  let likes = req.data.likes;
  let dislikes = req.data.dislikes;
  let sumLikes = await averagePreference(likes,token,req);
  let sumDislikes = await averagePreferences(dislikes,token,req);
  let result= await updatePreference(req.user.spotifyId,currentPreferenceId,sumLikes);
  if(result){
    res.send("Success!");
  }else{
    res.send("ohono. recommendation getnew error");
  }
  
});

async function averagePreference(array,token,req){  
  //let preferenceTerms = ['popularity', 'acousticness','energy'];
  let sumArray = {
                  target_popularity:0,
                  target_energy:0,
                  target_acousticness:0
                };
  let trackInfo = await axios.get(`https://api.spotify.com/v1/audio-features/${array[0]}`,{
    headers:{
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    sumArray.target_popularity = res.popularity;
    sumArray.target_energy = res.energy;
    sumArray.target_acousticness = res.acousticness;
  }).catch(async (error) =>{
    if (error.response.status == 401){
      console.log('expired access token');
      token = await updateAccessToken(req.user.spotifyId);
      trackInfo = await axios.get(`https://api.spotify.com/v1/audio-features/${array[0]}`,{
        headers:{
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      sumArray.target_popularity = trackInfo.popularity;
      sumArray.target_energy = trackInfo.energy;
      sumArray.target_acousticness = trackInfo.acousticness;
    }
  });

  for( let x = 1; x < array.length; x++){
    trackInfo = await axios.get(`https://api.spotify.com/v1/audio-features/${array[x]}`,{
    headers:{
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
    sumArray.target_popularity += trackInfo.popularity;
    sumArray.target_energy += trackInfo.energy;
    sumArray.target_acousticness += trackInfo.acousticness;
  }
  sumArray.target_popularity /= array.length;
  sumArray.target_energy /= array.length;
  sumArray.target_acousticness /= array.length;

  return sumArray;
}

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
      token = await updateAccessToken(req.user.spotifyId);
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
      console.error(error.response.data)
      return error
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
