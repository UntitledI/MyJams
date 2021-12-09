const Cache = require('../models/cache');

module.exports = async function getCache(endpoint) {
    return await Cache.findOne({ endpoint: endpoint }).exec().then((cache) => {
        return cache;
    }).catch((error) => {
        console.error(error);
    });
}