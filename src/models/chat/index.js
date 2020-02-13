const {
    db,
    admin
} = require("../../database");
const FieldValue = admin.firestore.FieldValue;

const CHAT_COLLECTION = db.collection('chats');
const MESSAGE_COLLECTION = db.collection('messages');

// Filter out chat data and only return fields that we expect in the database
const _filterChatData = (chatData) => {
    let filteredData = chatData;
    //TODO: Add implementation

    return filteredData;
};

// Filter out message data and only return fields that we expect in the database
const _filterMessageData = (messageData) => {
    let filteredData = messageData;
    //TODO: Add implementation

    return filteredData;
};

// Create chat
const createChat = async (insertData) => {
    // console.log(`insert data: `);
    // console.log(insertData);
    // console.log(`\n\n\n\n`);
    insertData.dateAdded = FieldValue.serverTimestamp();

    return CHAT_COLLECTION.doc().set(insertData);
};

/** Unmatch - hide chats as well as messages belonging to that chat
 * @param {Object} chatId - id of the chat to hide
 */
const unmatch = async (chatId) => {
    const chatRef = CHAT_COLLECTION.doc(chatId);
    const messages = await MESSAGE_COLLECTION.where('chatId', '==', chatId).get();

    const updateData = {
        isActive: false
    };
    const updateOptions = {
        merge: true
    };

    const chatUpdateStatus = chatRef.set(updateData, updateOptions);

    // Update each message
    messages.docs.forEach((currDoc) => {
        MESSAGE_COLLECTION.doc(currDoc.id).set(updateData, updateOptions);
    });

    return chatUpdateStatus;
};

/** Send message
 * @param {Object} messageData An object containing the message information - contains the chat id as well
 */
const sendMessage = async (messageData) => {
    messageData.dateSent = FieldValue.serverTimestamp();

    return MESSAGE_COLLECTION.doc().set(messageData, {
        merge: true
    });
};

//TODO: Update chat
//TODO: Update messages
//TODO: Delete messages

module.exports = {
    createChat,
    unmatch,
    sendMessage
}