const User = require('../models/user');
const axios = require('axios');
require('dotenv').config();

module.exports = async function updateAccessToken(id){
    
    const document = await User.findOne({spotifyId: id}).exec();
    //console.log("i am in accesstoken " + document.spotifyAccessToken);
    console.log(document);
    axios.post('https://accounts.spotify.com/api/token',{
        headers: {
            Authorization: 'Basic ' + (process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
        },
        form:{
            grant_type: 'refresh_token',
            refresh_token: document.spotifyRefreshToken
        },
        json: true
    }).then(async function(res){
        console.log("I got something. "+ res);
        document.spotifyAccessToken = res.access_token;
        await document.save();

    }).catch((err)=>{
        console.log("getting new access token error : " + err);
    })
    
    return document.spotifyAccessToken;
}