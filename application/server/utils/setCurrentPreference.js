const User = require('../models/user');
const Preference = require('../models/preference');

module.exports = async function setCurrentPreference(spotifyId, preferenceId) {
    // First check that preference exists in the db
    return await Preference.findOne({ _id: preferenceId }).exec().then((preference) => {
        // If preference exists then set user's current preference
        if (preference) {
            return User.updateOne({ spotifyId: spotifyId }, { preferenceId: preferenceId })
        } else return false;
    }).then(() => {
        return true;
    }).catch((error) => {
        console.log('Error occured when trying to set current preference for user', spotifyId);
        console.log(error);
    });
}