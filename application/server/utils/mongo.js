const mongoose = require('mongoose');
const uri = process.env.MONGODB_URL;

module.exports = async function run() {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}