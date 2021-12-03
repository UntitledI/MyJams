const User = require('../models/user');

module.exports = async function getPreferences(id){
    const documentQuery = await User.findOne({spotifyId: id}).exec();
    return documentQuery.toObject().preferences;
}