const Preference = require('../models/preference');

module.exports = async function removePreferences(spotifyId, preferenceId) {
    return await Preference.findOne({ spotifyId: spotifyId, _id: preferenceId }).exec().then((preference) => {
        return Preference.deleteOne(preference)
    }).then((result) => {
        return result;
    }).catch((error) => {
        console.log(error);
    });
}