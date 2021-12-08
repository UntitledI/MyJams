const Preference = require('../models/preference');

module.exports = async function getPreference(preferenceId) {
    return await Preference.findOne({ _id: preferenceId }).exec().then((preference) => {
        return preference;
    }).catch((error) => {
        console.error(error);
    });
}