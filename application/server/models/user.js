const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// nested preferences schema
const preferenceSchema = new Schema({
    genre: {type: String, required: true},
    energetic: {type: String, required: true},
    popularity: {type: String, required: true},
    acousticness: {type: String, required: true},
});

const UserSchema = new Schema({
    name: {
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    preferences: [preferenceSchema]
})

const User = mongoose.model('User', UserSchema)
module.exports = User;
module.exports = async function setRecommendations(id,preferences){
    
    mongoose.connection().on('connected',function(ref){
        console.log("Connected to the mongo database: "+ ref);
    });
    mongoose.connection().on('disconnected',function(ref){
        console.log("Connected from the mongo database: "+ ref);
    })
    mongoose.connect('mongodb://localhost');
    mongoose.findOneAndUpdate(id,{preferences:preferences},{preferences:[preferenceSchema]});
    //pick top of bottom.
    const documentQuery = await mongoose.findById(id);
    documentQuery.preferences = preferences;
    await documentQuery.save();
    return documentQuery;
}
module.exports = async function getAccessToken(id){
    const document = await mongoose.findById(id);
    return document.get('spotifyAccessToken');
}
module.exports = async function getRecommendations(id){
    const documentQuery = await User.findById(id);
    return documentQuery.get('preferences');
}