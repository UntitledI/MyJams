const axios = require('axios');
var express = require('express');
const app = express();
const router = express.Router();
const getPreferences = require('../utils/getPreferences');
const getAccessToken = require('../utils/getAccessToken');
const updateAccessToken = require('../utils/updateAccessToken');

router.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*")
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS,GET');
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,Content-Length");
  next();
});

router.get('/',function(req,res){
  res.send("Recommendation home")
});

router.get('/get',function(req,res){
  //call db for user prefernces and token
  const url = 'https://api.spotify.com/v1/recommendations';
  let token; 
  console.log(req.query.spotifyId);
  getAccessToken(req.query.spotifyId).then((tok)=>{
	console.log("token: " + tok);
	token = tok;
  }).catch((e)=>{
	 console.log(e);
  });
  let preferenceArr;
  let keys;
  getPreferences(req.query.spotifyId).then((arr)=>{
	preferenceArr = arr;
  console.log("found preferences");
  keys = Object.keys(preferenceArr);
  //console.log(preferenceArr);
  }).catch((e)=>{
    console.log(e);
  });
  
  console.log(preferenceArr);
  var spotifyRequest = new String(url);
  //length-1 because the last item in the array seems to be objectId. 
  for(x = 0; x < preferenceArr.length-1; x ++){
    if(x == 0 ){
      spotifyRequest.concat(`?${keys[x]}=${preferencesArr[x]}&`);
    }else{
      spotifyRequest.concat(`${keys[x]}=${preferenceArr[x]}`);
    }
    if(x + 1 <= preferenceArr.length){
      spotifyRequest.concat('&');
    }
  }
  spotifyRequest.concat('&limit=10');
  const {data} = axios.get(spotifyRequest,{
    headers:{
      "Authorization" : `Bearer ${token}`
    }
  }).then((res)=>{
    console.log("found songs. "+ res);
  }).catch((err)=>{
    console.log(err);
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
