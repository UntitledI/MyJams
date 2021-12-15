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
const updatePreference = require('../utils/updatePreference');

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

router.post('/new', authenticateToken, async function(req,res){
  console.log("hi i am in getnew " + req.user.spotifyId);
  const token = await getAccessToken(req.user.spotifyId);
  let currentPreferenceId = await getCurrentPreference(req.user.spotifyId);
  //console.log(req); 
  let likes = req.body.likes;
  let dislikes = req.body.dislikes;
  console.log(likes);
  let sumLikes = await averagePreference(likes,token,req);
  let sumDislikes = await averagePreference(dislikes,token,req);
  let result;
  console.log(sumLikes);
  if (sumLikes){
    console.log("I am in the likes")
    result = await updatePreference(req.user.spotifyId,currentPreferenceId,sumLikes);
  }else if (sumDislikes){
    console.log("I am in the dislikes")
    result = await updatePreference(req.user.spotifyId,currentPreferenceId,sumDislikes);
  }
  //result = await updatePreference(req.user.spotifyId,currentPreferenceId,sumLikes);
  res.send(result);
  
});

async function averagePreference(array,token,req){  
  //let preferenceTerms = ['popularity', 'acousticness','energy'];
  let sumArray = {
                  target_popularity:0,
                  target_energy:0,
                  target_acousticness:0
                };
  /*
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
  */
  for( let x = 1; x < array.length; x++){
    /*trackInfo = await axios.get(`https://api.spotify.com/v1/audio-features/${array[x]}`,{
    headers:{
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });*/
    trackInfo = await getTrackPreferences(token,array[x],req);
    console.log(trackInfo);
    sumArray.target_popularity += trackInfo.target_popularity;
    sumArray.target_energy += trackInfo.target_energy;
    sumArray.target_acousticness += trackInfo.target_acousticness;
  }
  //console.log(sumArray);
  sumArray.target_popularity = Math.round(sumArray.target_popularity/array.length);
  sumArray.target_energy /= array.length;
  sumArray.target_acousticness /= array.length;

  return sumArray;
}
async function getTrackPreferences(token,trackId,req){
  let track = {
    target_popularity:0,
    target_energy:0,
    target_acousticness:0
  };
  let trackAudioFeatures = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`,{
    headers:{
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    track.target_energy = res.data.energy;
    track.target_acousticness = res.data.acousticness;
  }).catch( async(err) => {
    if(err.response.status == 401){
      console.log('expired access token');
      token = await updateAccessToken(req.user.spotifyId);
      trackAudioFeatures = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`,{
        headers:{
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
  });
  let trackInfo = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}?market=US`,{
    headers:{
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    console.log(res.data);
    track.target_popularity = res.data.popularity;
  })
  return track;
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
