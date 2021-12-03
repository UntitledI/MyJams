const User = require('../models/user');
const axios = require('axios');
const queryString = require('querystring');
require('dotenv').config();

module.exports = async function updateAccessToken(id){
    
    const document = await User.findOne({spotifyId: id}).exec();
    //console.log("i am in accesstoken " + document.spotifyAccessToken);
    //console.log(document.spotifyRefreshToken);
    const stuff = (`${process.env.SPOTIFY_CLIENT_ID}`+ ':' +`${process.env.SPOTIFY_CLIENT_SECRET}`);
    const aaa = Buffer.from(stuff).toString('base64');
    //console.log(aaa);
    axios.post('https://accounts.spotify.com/api/token',queryString.stringify({
        grant_type: "refresh_token",
        refresh_token: document.spotifyRefreshToken
    }),
    {
        headers: {
            Authorization: `Basic ${aaa}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json:true
    }).then(async function(res){
        console.log("I got something. ");
        //console.log(res);
        document.spotifyAccessToken = res.data.access_token;
        await document.save();

    }).catch(function(error){
        console.log("refresh token ")
        console.log(error);
    })
    
    return document.spotifyAccessToken;
}