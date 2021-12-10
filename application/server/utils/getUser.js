const User = require('../models/user');

module.exports = {
    getUserWithSpotifyId: async function (spotifyId) {
        return await User.findOne({ spotifyId: spotifyId }).exec().then((user) => {
            return user;
        }).catch((error) => {
            console.error(error);
        });
    },
    getUserWithLoginCode: async function (loginCode) {
        return await User.findOne({ loginCode: loginCode }).exec().then((user) => {
            return user;
        }).catch((error) => {
            console.error(error);
        });
    }
}