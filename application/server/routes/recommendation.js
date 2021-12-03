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

router.get('/', function (req, res) {
    res.send("Recommendation home")
});

router.get('/get', async function (req, res) {
    //call db for user prefernces and token
    console.log("Im in reccomendations endpoint")
    const url = 'https://api.spotify.com/v1/recommendations';
    let preferenceArr = [];
    let keys;
    let spotifyRequest = url+`?market=US&`;

    let token = await getAccessToken(req.query.spotifyId);
    let preferences = await getPreferences(req.query.spotifyId);
    preferenceArr = preferences[0];
    console.log("found preferences");
    delete preferenceArr._id;
    keys = Object.keys(preferenceArr);
    
    console.log("keys: "+ keys);
    console.log(keys.length);
    console.log(preferenceArr);
    for(var key in preferenceArr){
     
        spotifyRequest+=`${key}=${preferenceArr[key]}&`;
    }
    spotifyRequest += ('limit=10');
    // Make request url
    /*
    for(x = 0; x < keys.length-1; x ++){
    if(x == 0 ){
      spotifyRequest.concat(`?${keys[x]}=${preferencesArr[x]}&`);
    }else{
      spotifyRequest.concat(`${keys[x]}=${preferenceArr[x]}`);
    }
    if(x + 1 <= preferenceArr.length){
      spotifyRequest.concat('&');
    }
  }
    spotifyRequest = spotifyRequest.concat(`?market=ES&seed_genres=${preferenceArr.genre}&`);
    spotifyRequest = spotifyRequest.concat(`target_energy=${preferenceArr.energetic}&`);
    spotifyRequest = spotifyRequest.concat(`target_popularity=${preferenceArr.popularity*100}&`);
    spotifyRequest = spotifyRequest.concat(`target_acousticness=${preferenceArr.acousticness}`);
    */

    console.log(spotifyRequest);
    // console.log(token);

    // Make request
    let songArray;
    try {
        songArray = await getRecommendations(token, spotifyRequest, req)
    } catch (e) {
        throw (e)
    }
    res.send(songArray);
    /*let songArray = [];
    for(x=0; x < data.tracks.length;x++){
      const trackURL = data.tracks[x].external_urls.spotify;
      const songName = data.tracks[x].name;
      const id = data.tracks[x].id;
      const albumCover = data.tracks[x].album.images[0].url;
      const artistName = data.tracks[x].album.artists[0].name;
      const trackCover = axios.get(`https://api.spotify.com/v1/tracks/${id}`,{
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }).album.images[0].url;
      if(trackCover == albumCover){
        songArray.push({"id": id,
                      "name" : songName,
                    "artist": artistName,
                    "image" : albumCover});
      }else{
        songArray.push({"id": id,
                      "name" : songName,
                    "artist": artistName,
                    "image" : trackCover});
      }
    }
    res.send(songArray);*/
})

async function convertToArray(data) {
    let songArr = [];
    for (x = 0; x < data.tracks.length; x++) {
        const trackURL = data.tracks[x].external_urls.spotify;
        const songName = data.tracks[x].name;
        const id = data.tracks[x].id;
        const albumCover = data.tracks[x].album.images[0].url;
        const artistName = data.tracks[x].album.artists[0].name;

        songArray.push({
            "id": id,
            "name": songName,
            "artist": artistName,
            "image": albumCover
        });
    }
    return songArr;
}

async function getRecommendations(token, spotifyRequest, req) {
    let songArray;
    let res
    console.log("getting reccomendations now")
    try{
        res = await axios.get(spotifyRequest, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }catch (e){
        console.log("failed to get request")
        //console.log(e)
        res = await axios.get(spotifyRequest, {
            headers: {Authorization: `Bearer ${await updateAccessToken(req.query.spotifyId)}`}
        })
    }
    console.log(spotifyRequest)
    console.log("found songs. ")
    console.log(res.data);
    songArray = convertToArray(res);
    return songArray
}

module.exports = router;
