const ChatModel = require('../../models/chat');

/** Create chats
 * @param {Object} participantIds an array containing the chat participants
 */
const createChat = async (participantIds) => {
    console.log(participantIds);
    const insertData = {
        participantIds
    };

    // console.log(insertData);
    return ChatModel.createChat(insertData);
};

/** Send message 
 * @param {String} chatId Id of the chat to send the message to 
 * @param {Object} messageData An object containing the message data
 */
const sendMessage = async (chatId, messageData) => {
    messageData.chatId = chatId;

    return ChatModel.sendMessage(messageData);
};

/** Unmatch with a user - deactivate messages belonging to that chat as well
 * @param {String} chatId Id of the chat to deactivate as well as messages to deactivate
 */
const unmatch = async (chatId) => {
    return ChatModel.unmatch(chatId);
};

module.exports = {
    createChat,
    sendMessage,
    unmatch
}