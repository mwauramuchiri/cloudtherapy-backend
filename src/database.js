const admin = require("firebase-admin");
const serviceAccount = require("./credentials/ltai-9957c-839641c88c69.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = {
    admin,
    db: admin.firestore(),
    firestore: admin.firestore
};