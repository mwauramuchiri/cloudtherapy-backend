const UserModel = require('../../models/user');

/** Authenticate user */
const authUser = async (userData) => {
    const userWithEmail = await UserModel.getUserByEmail(userData.email);

    if (userWithEmail.exists) {
        console.info(`User with that email (${userData.email}) exists\n Logging in`);
        UserModel.updateUser(userData.uid, userData);
    } else {
        console.info(`New account, creating new account for ${userData.email}`);
        UserModel.createUser(userData);
    }
};

module.exports = {
    authUser
};