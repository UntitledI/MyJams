const User = require('../models/user');

module.exports = async function addNewUser(email, spotifyId, spotifyAccessToken, spotifyRefreshToken, spotifyExpiresIn) {
    //  First we want to check whether the user already exists in the database
    return await User.findOne({ spotifyId: spotifyId }).exec().then((user) => {
        if (user) { // The user already exists in the db, so we'll just update the user's tokens
            console.log('Returning user', spotifyId, 'found!');
            return user.updateOne({ spotifyId: spotifyId }, {
                spotifyAccessToken: spotifyAccessToken,
                spotifyRefreshToken: spotifyRefreshToken,
                spotifyExpiresIn: spotifyExpiresIn
            });
        } else {    // This is a brand new user. We must add them to the db
            console.log('Adding new user', spotifyId, 'to the database!');
            return User.create({
                email: email,
                spotifyId: spotifyId,
                spotifyAccessToken: spotifyAccessToken,
                spotifyRefreshToken: spotifyRefreshToken,
                spotifyExpiresIn: spotifyExpiresIn
            });
        }
    }).then((user) => { // Return the user
        return user;
    }).catch((error) => {
        console.log('An error occured when querying User inside addNewUser()!');
        console.log(error);
    })
}