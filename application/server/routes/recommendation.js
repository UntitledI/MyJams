const axios = require('axios');
const app = require('../../app');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const UserDb = require('../models/user');

//app.post()
//make make this a separate file for setting preferences.
router.post('/recommendation',function(req,res,next){
  res.send("Got post request.");
  res.send("You sent "+ req.query);
  const Arr = req.query.parse();
  UserDb.setRecommendations(req.query.id,req.query.recommendations).then((preferences)=>{
    console.log(preferences);
  }).catch((e)=>{
    console.log(e);
  });
  //req.parmas.answer???
  res.redirect("/");
  //push req.body to db if that's where the array is.

});
//app.get()
router.get('/recommendation',function(req,res){
  //call db for user prefernces and token
  const url = 'https://api.spotify.com/v1/recommendations';
  let token = UserDb.getAccessToken(req.query.id);
  let preferenceArr = UserDb.getRecommendations(req.query.id).then(()=>{

  }).catch((e)=>{
    
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
  for(x = 0; x < preferenceArr.length; x ++){
    if(x == 0 ){
      spotifyRequest.concat(`?${key[x]}=${preferencesArr[x]}&`);
    }else{
      spotifyRequest.concat(`${key[x]}=${preferenceArr[x]}`);
    }
    if(x +1 <= preferenceArr.length){
      spotifyRequest.concat('&');
    }
  }
  const {data} = await axios.get(spotifyRequest,{
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
