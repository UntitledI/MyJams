const User = require('../models/user');
const mongoose = require('mongoose');
module.exports = async function getAccessToken(id){
    const document = await User.findOne({spotifyId: id}).exec();
    return document.spotifyAccessToken;
}