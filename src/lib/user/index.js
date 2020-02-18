const UserModel = require('../../models/user');

/** Get single user by id 
 * @param {String} uid The id of the user to get
 * @return {Object} A promise that resolves to the user with the id of `uid`
 */
const getUserById = async (uid) => {
    return UserModel.getUserById(uid);
}

module.exports = {
    getUserById
}