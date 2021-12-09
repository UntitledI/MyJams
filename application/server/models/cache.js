const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CacheSchema = new Schema({
    endpoint: {
        type: String,
        required: true,
        indexed: true
    },
    data: {
        type: Schema.Types.Mixed,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Cache = mongoose.model('Cache', CacheSchema);
module.exports = Cache;