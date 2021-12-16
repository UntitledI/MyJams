const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreferenceSchema = new Schema({
    spotifyId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    seed_genres: {
        type: String,
        required: true
    },
    target_energy: {
        type: String,
        required: true
    },
    target_popularity: {
        type: String,
        required: true
    },
    target_acousticness: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    plays: {
        type: Number,
        required: true
    }
});

const Preference = mongoose.model('Preference', PreferenceSchema);
module.exports = Preference;