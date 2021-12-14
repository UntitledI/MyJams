const Preference = require('../models/preference');

module.exports = async function setPreferences(id, preference) {
    return await Preference.create({
        spotifyId: id,
        seed_genres: preference.seed_genres,
        target_energy: preference.target_energy,
        target_popularity: preference.target_popularity,
        target_acousticness: preference.target_acousticness
    }).then((res) => {
        return res;
    }).catch((err) => {
        console.log('Error occured in setPreferences() when creating a new preference');
        console.log(err);
    });
}