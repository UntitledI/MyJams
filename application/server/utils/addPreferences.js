const Preference = require('../models/preference');
const User = require('../models/user');

module.exports = async function setPreferences(id, preference) {
    return await Preference.create({
        spotifyId: id,
        seed_genres: preference.seed_genres,
        target_energy: preference.target_energy,
        target_popularity: preference.target_popularity,
        target_acousticness: preference.target_acousticness
    }).then((res) => {
        return User.updateOne({ spotifyId: res.spotifyId }, { preferenceId: res._id });
    }).catch((err) => {
        console.log('Error occured in setPreferences() when creating a new preference');
        console.log(err);
    });
}
