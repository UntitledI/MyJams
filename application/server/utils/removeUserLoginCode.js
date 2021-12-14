const User = require('../models/user');

module.exports = async function removeUserLoginCode(loginCode) {
    return await User.findOneAndUpdate({ loginCode: loginCode }, { loginCode: null }).catch((error) => {
        console.error(error);
    })
}