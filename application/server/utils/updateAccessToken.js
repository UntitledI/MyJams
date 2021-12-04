const User = require('../models/user');
const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config();

module.exports = async function updateAccessToken(id) {
    return await User.findOne({ spotifyId: id }).exec().then((user) => {
        return axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: "refresh_token",
            refresh_token: user.spotifyRefreshToken
        }),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                auth: {
                    username: process.env.SPOTIFY_CLIENT_ID,
                    password: process.env.SPOTIFY_CLIENT_SECRET
                }
            })
    }).then(async (res) => {
        await User.updateOne({ spotifyId: id }, { spotifyAccessToken: res.data.access_token });
        return res.data.access_token;
    }).then((token) => {
        console.log("User", id, "has new access token");
        return token;
    }).catch((err) => {
        console.log("Error inside updateAccessToken()");
        console.log(err);
    })
}