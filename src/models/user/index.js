const {
    db,
    admin
} = require("../../database");
const FieldValue = admin.firestore.FieldValue;

// Collection names
const USER_COLLECTION = db.collection('users');


//* FUNCTIONS
const _filterUserData = (userData, isAdmin = false) => {
    delete userData.dateCreated;
    if (!isAdmin) {
        delete userData.isBanned;
    }

    return userData;
};

// Create useruser
const createUser = (userData) => {
    userData.isNew = true;
    userData.dateCreated = FieldValue.serverTimestamp();

    userData = _filterUserData(userData);

    return USER_COLLECTION.doc(userData.uid).set(userData);
};

// Update user
const updateUser = (uid, userData) => {
    userData.isNew = false;
    userData.dateUpdated = FieldValue.serverTimestamp();

    console.log("Updated");
    userData = _filterUserData(userData);

    return USER_COLLECTION.doc(uid).set(userData, {
        merge: true
    });
};

// Get user by id
const getUserById = async (uid) => {
    const {
        docs
    } = await USER_COLLECTION.where('uid', '==', uid).get();
    // Get the first user found
    const _user = docs.length ? docs[0].data() : {};
    return _user;
};

// Get user by email
const getUserByEmail = async (email) => {
    const {
        docs
    } = await USER_COLLECTION.where('email', '==', email).get();

    // Get the first user found
    const _user = docs.length ? docs[0].data() : {};
    return _user;
}

// Get multiple users
const getMultipleUsers = async (limit = 20, filter = {}) => {
    const {
        docs
    } = await USER_COLLECTION.limit(limit).get();

    return docs;
};

//* EXPORTS
module.exports = {
    createUser,
    updateUser,
    getUserById,
    getMultipleUsers,
    getUserByEmail
}