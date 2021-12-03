const User = require('../models/user');
const mongoose = require('mongoose');
module.exports = async function findUser(id){
    const document = await User.findOne({spotifyId: id}).exec();
    return document;
}