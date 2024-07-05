var admin = require("firebase-admin");

var serviceAccount = require("./../credentials/ementoring-afric-1536067843571-firebase-adminsdk-cxwi3-9c68eb4b9c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ementoring-afric-1536067843571.firebaseio.com"
});

module.exports = {
    admin,
    db: admin.firestore(),
    firestore: admin.firestore
};