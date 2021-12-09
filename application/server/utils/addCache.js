const Cache = require('../models/cache');

module.exports = async function addCache(endpoint, data) {
    return await Cache.create({
        endpoint: endpoint,
        data: data
    }).then((res) => {
        return res;
    }).catch((error) => {
        console.error(error);
    });
}