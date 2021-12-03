const User = require('../models/user');
const mongoose = require('mongoose');
const Preference = require('../models/user');

module.exports = async function setPreferences(id,preference){
    //pick top of bottom.
    //const documentQuery = await User.findById(id);
    const documentQuery = await User.findOne({spotifyId: id}).exec();
    //console.log(documentQuery);
    /*const query = User.findOneAndUpdate({spotifyId: id},{preferences: preference},overwrite = false,function(err,docs){
        if(err){
            console.log(err);
        }else{
            console.log("updated " + docs);
        }
    });*/
    documentQuery.preferences.push(preference);
    /*documentQuery.preferences.genre = preference.Genre;
    documentQuery.preferences.energetic = preference.Energetic;
    documentQuery.preferences.popularity = preference.Popularity;
    documentQuery.preferences.acousticness = preference.Acousticness;*/
    console.log(documentQuery.preferences);
    //console.log(query.get('preferences'));
    await documentQuery.save();
    return documentQuery.preferences;
}