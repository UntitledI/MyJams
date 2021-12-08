
const User = require('../models/user');

module.exports = async function addOrFindUser(spotifyId, email, name, followers, image, spotifyAccessToken, spotifyRefreshToken, spotifyExpiresIn) {
    //  First we want to check whether the user already exists in the database
    return await User.findOne({ spotifyId: spotifyId }).exec().then((user) => {
        if (user) { // The user already exists in the db, so we'll just update the user's info
            console.log('Returning user', spotifyId, 'found!');
            return User.findByIdAndUpdate({ _id: user._id }, {
                email: email,
                name: name,
                image: image,
                followers: followers,
                spotifyId: spotifyId,
                spotifyAccessToken: spotifyAccessToken,
                spotifyRefreshToken: spotifyRefreshToken,
                spotifyExpiresIn: spotifyExpiresIn
            }, {
                new: true
            });
        } else {    // This is a brand new user. We must add them to the db
            console.log('Adding new user', spotifyId, 'to the database!');
            return User.create({
                email: email,
                name: name,
                image: image,
                followers: followers,
                spotifyId: spotifyId,
                spotifyAccessToken: spotifyAccessToken,
                spotifyRefreshToken: spotifyRefreshToken,
                spotifyExpiresIn: spotifyExpiresIn
            });
        }
    }).then((res) => { // Return the user
        const user = {
            spotifyId: res.spotifyId,
            email: res.email,
            name: res.name,
            image: res.image,
            followers: res.followers
        }
        return user;
    }).catch((error) => {
        console.log('Error occured!');
        // console.error(error);
    })
}