const User = require('../models/user');
const mongoose = require('mongoose');
module.exports = async function getAccessToken(id){
    const expirationMs = 3600000;
    const document = await User.findOne({spotifyId: id}).exec();
    return document.spotifyAccessToken;
}