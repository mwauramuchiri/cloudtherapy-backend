const {
    db,
    admin
} = require("../../database");
const FieldValue = admin.firestore.FieldValue;

const CHAT_COLLECTION = db.collection('chats');
const MESSAGE_COLLECTION = db.collection('messages');

// Filter out chat data and only return fields that we expect in the database
const _filterChatData = (chatData) => {
    // Initiator data to exclude from chat
    delete chatData.initiator.email;
    delete chatData.initiator.isNew;
    delete chatData.initiator.provider;
    delete chatData.initiator.signInMethod;
    delete chatData.initiator.emailVerified;
    delete chatData.initiator.dateCreated;
    delete chatData.initiator.dateUpdated;
    delete chatData.initiator.isBanned;

    // Prospect data to exclude from chat
    delete chatData.prospect.email;
    delete chatData.prospect.isNew;
    delete chatData.prospect.provider;
    delete chatData.prospect.signInMethod;
    delete chatData.prospect.emailVerified;
    delete chatData.prospect.dateCreated;
    delete chatData.prospect.dateUpdated;
    delete chatData.prospect.isBanned;

    return chatData;
};

// Filter out message data and only return fields that we expect in the database
const _filterMessageData = (messageData) => {
    let filteredData = messageData;
    //TODO: Add implementation

    return filteredData;
};

// Create chat ~ return the sanitized chat data
const createChat = async (chatData) => {
    chatData.isNew = true;
    chatData.dateAdded = FieldValue.serverTimestamp();
    chatData.dateUpdated = FieldValue.serverTimestamp();
    chatData = _filterChatData(chatData);

    const _insertStatus = CHAT_COLLECTION.doc().set(chatData);
    return chatData;
};

/** Update chat */
const updateChat = (chatId, updateData) => {
    updateData.isNew = false;
    chatData.dateUpdated = FieldValue.serverTimestamp();
    updateData = _filterChatData(updateData);

    return CHAT_COLLECTION.doc(chatId).set(updateData, {
        merge: true
    });
}

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

//TODO: Update messages
//TODO: Delete messages

module.exports = {
    createChat,
    updateChat,
    unmatch,
    sendMessage
}