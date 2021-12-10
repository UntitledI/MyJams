const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    followers: {
        type: Number,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    spotifyId: {
        type: String,
        required: true
    },
    loginCode: {
        type: String,
        required: false
    },
    spotifyAccessToken: {
        type: String,
        required: true
    },
    spotifyRefreshToken: {
        type: String,
        required: true
    },
    spotifyExpiresIn: {
        type: Number,
        required: true
    },
    preferenceId: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User;
