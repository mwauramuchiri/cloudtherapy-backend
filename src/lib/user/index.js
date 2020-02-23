const UserModel = require('../../models/user');

/** Get single user by id 
 * @param {String} uid The id of the user to get
 * @return {Object} A promise that resolves to the user with the id of `uid`
 */
const getUserById = async (uid) => {
    return UserModel.getUserById(uid);
}

/** Update user
 *  @param {String} uid The id of the user to get
 *  @param {Object} updateData New user data - update the user with this
 */
const updateUser = async (uid, updateData) => {
    return UserModel.updateUser(uid, updateData);
};

module.exports = {
    getUserById,
    updateUser
}