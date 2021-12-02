const axios = require('axios');
var express = require('express');
const app = express();
const router = express.Router();
const getRecommendations = require('../utils/getRecommendation');
const getAccessToken = require('../utils/getAccessToken');

//app.get()
router.get('/',function(req,res){
  res.send("Recommendation home")
});

router.get('/get',function(req,res){
  //call db for user prefernces and token
  const url = 'https://api.spotify.com/v1/recommendations';
  let token; 
  getAccessToken(req.query.id).then((tok)=>{
	console.log("token: " + tok);
	token = tok;
  }).catch((e)=>{
	 console.log(e);
  });
  let preferenceArr;
  getRecommendations(req.query.id).then((arr)=>{
	preferenceArr = arr;
  }).catch((e)=>{
    console.log(e);
  });
  var keys = Object.keys(preferenceArr);
  /*let artistStringRecommendation;
  if(artistString.length < 0){
    return;
  }else{
    artistStringRecommendation = `seed_artists=${artistString.join(',')}`;
  }
  let minValues = [];
  let maxValues = [];
  const minString = minValues.join('&');
  const maxString = maxValues.join('&');*/
  var spotifyRequest = new String(url);
  //length-1 because the last item in the array seems to be objectId. 
  for(x = 0; x < preferenceArr.length-1; x ++){
    if(x == 0 ){
      spotifyRequest.concat(`?${key[x]}=${preferencesArr[x]}&`);
    }else{
      spotifyRequest.concat(`${key[x]}=${preferenceArr[x]}`);
    }
    if(x + 1 <= preferenceArr.length){
      spotifyRequest.concat('&');
    }
  }
  const {data} = axios.get(spotifyRequest,{
    headers:{
      "Authorization" : `Bearer ${token}`
    }
  });
  let songArray = [];
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
  res.send(songArray);
})

module.exports = router;
