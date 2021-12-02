const User = require('../models/user');

module.exports = async function getRecommendations(id){
    const documentQuery = await User.findById(id);
    return documentQuery.get('preferences');
}