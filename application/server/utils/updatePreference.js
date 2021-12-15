const Preference = require('../models/preference');

module.exports = async function updatePreference(spotifyId, preferenceId, newPreferences) {
    // First check that preference exists in the db
    Preference.findOne({ _id: preferenceId }).exec().then((preference) => {
        // If preference exists then set user's current preference
        if (preference) {
            console.log("I found it.")
            Preference.updateOne({_id:preferenceId},{
                target_energy : newPreferences.target_energy,
                target_popularity : newPreferences.target_popularity,
                target_acousticness : newPreferences.target_acousticness}).exec().then((res) => {
                    console.log("aaa"+res);
                });
             
            preference.target_energy = newPreferences.target_energy;
            preference.target_popularity = newPreferences.target_popularity;
            preference.target_acousticness = newPreferences.target_acousticness;
            console.log(preference);
            
        }else return false;
    }).catch((error) => {
        console.log('Error occured when trying to update current preference for user', spotifyId);
        console.log(error);
    });
}