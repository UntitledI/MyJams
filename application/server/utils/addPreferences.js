const Preference = require('../models/preference');
const User = require('../models/user');

module.exports = async function addPreferences(id, preference) {
    return await Preference.create({
        spotifyId: id,
        title: preference.preference_title,
        seed_genres: preference.seed_genres,
        target_energy: preference.target_energy,
        target_popularity: preference.target_popularity,
        target_acousticness: preference.target_acousticness
    }).then((res) => {
        return User.updateOne({ spotifyId: res.spotifyId }, { preferenceId: res._id });
    }).catch((err) => {
        console.error(err);
    });
}
