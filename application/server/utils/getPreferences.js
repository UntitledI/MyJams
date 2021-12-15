const Preference = require('../models/preference');

module.exports = async function getPreferences(id) {
    return await Preference.find({ spotifyId: id }).exec().then((preferences) => {
        return preferences;
    }).catch((error) => {
        console.error(error);
    });
}