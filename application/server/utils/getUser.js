const User = require('../models/user');

module.exports = {
    getUserWithSpotifyId: async function (spotifyId) {
        return await User.findOne({ spotifyId: spotifyId }).exec().then((user) => {
            return user;
        }).catch((error) => {
            console.error(error);
        });
    },
    getUserWithRefreshToken: async function (refreshToken) {
        return await User.findOne({ refreshToken: refreshToken }).exec().then((user) => {
            return user;
        }).catch((error) => {
            console.error(error);
        });
    }
}