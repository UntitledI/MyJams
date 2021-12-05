const User = require('../models/user');

module.exports = async function getCurrentPreference(spotifyId) {
    return await User.findOne({ spotifyId: spotifyId }).exec().then((user) => {
        return user.preferenceId;
    }).catch((error) => {
        console.log('Error occured when trying to retrieve preferences in getPreferences()');
        console.log(error);
    });
}