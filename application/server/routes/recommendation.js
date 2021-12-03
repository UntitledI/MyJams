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
  let preferenceArr=[];
  //let keys;
  var spotifyRequest = url;
  getAccessToken(req.query.spotifyId).then((tok)=>{
	  //console.log("token: " + tok);
	  token = tok;
    getPreferences(req.query.spotifyId).then((arr)=>{
      preferenceArr = arr[0];
      console.log("found preferences");
      //console.log(preferenceArr);
      spotifyRequest = spotifyRequest.concat(`?market=ES&seed_genres=${preferenceArr.genre}&`);
      spotifyRequest = spotifyRequest.concat(`target_energy=${preferenceArr.energetic}&`);
      spotifyRequest = spotifyRequest.concat(`target_popularity=${preferenceArr.popularity}&`);
      spotifyRequest = spotifyRequest.concat(`target_acousticness=${preferenceArr.acousticness}`);
      //console.log("keys: "+ keys);
      //length-1 because the last item in the array seems to be objectId. 
      spotifyRequest = spotifyRequest.concat('&limit=10');
      console.log(spotifyRequest);
      console.log();
      console.log(token);

       axios.get(spotifyRequest,{
          headers:{Authorization : `Bearer ${token}`}
        }).then((res)=>{
            console.log("found songs. "+ res);
            songArray = convertToArray(res);
            res.send(songArray);
          }).catch((err)=>{
              console.log("recommendation error: ");
              console.log(err.response);
              updateAccessToken(req.query.spotifyId);
              axios.get(spotifyRequest,{
                headers:{Authorization : `Bearer ${token}`}
              }).then((res)=>{
                  console.log("2nd attempt successful!");
                  songArray = convertToArray(res);
                  res.send(songArray);
                })
            });
            
    }).catch((e)=>{
          console.log("preferences error: " + e);
        });
  }).catch((e)=>{
	    console.log("access token error: " +e);
    });
  
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
async function convertToArray(data){
  let songArr = [];
  for(x=0; x < res.tracks.length;x++){
      const trackURL = data.tracks[x].external_urls.spotify;
      const songName = data.tracks[x].name;
      const id = data.tracks[x].id;
      const albumCover = data.tracks[x].album.images[0].url;
      const artistName = data.tracks[x].album.artists[0].name;
  
        songArray.push({"id": id,
                      "name" : songName,
                    "artist": artistName,
                    "image" : albumCover});
    }
  return songArr;
}

module.exports = router;
