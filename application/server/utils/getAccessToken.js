const User = require('../models/user');
const mongoose = require('mongoose');
module.exports = async function getAccessToken(id){
    const document = await User.findById(id);
    return document.get('spotifyAccessToken');
}