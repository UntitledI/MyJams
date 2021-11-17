// Makes a new user in the database using the user schema
const User = require('../models/user');
module.exports = async function addNewUser(email, spotifyId, spotifyAccessToken, spotifyRefreshToken, spotifyExpiresIn){
    const user = new User({
        email,
        spotifyId,
        spotifyAccessToken,
        spotifyRefreshToken,
        spotifyExpiresIn
    });
    await user.save();
    return user;
}