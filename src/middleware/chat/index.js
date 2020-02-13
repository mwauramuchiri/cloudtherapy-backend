const Chat = require('../../lib/chat');
const Api = require('../../utils/api');

// Create chat
const createChat = (req, res, next) => {
    const participantIds = req.body.data.participantIds;
    Chat.createChat(participantIds).then(() => {
        const statusCode = 201;
        const response = Api.getResponse(true, "Successfully created chat", null, statusCode);

        res.status(statusCode).json(response);
    }).catch((err) => {
        const response = Api.getError("Failed to create chat", err);
        res.status(500).json(response);
    }).finally(next);

};

// Send message
const sendMessage = (req, res, next) => {
    const chatId = req.body.data.chatId;
    const messageData = req.body.data.message;

    Chat.sendMessage(chatId, messageData).then(() => {
        const statusCode = 201;
        const response = Api.getResponse(true, "Successfully sent message", null, statusCode);

        res.status(statusCode).json(response);
    }).catch((err) => {
        const response = Api.getError("Failed to send message", err);
        res.status(500).json(response);
    }).finally(next);
};

// Unmatch with a user
const unmatch = (req, res, next) => {
    const chatId = req.body.data.chatId;


    Chat.unmatch(chatId).then(() => {
        const statusCode = 200;
        const response = Api.getResponse(true, `Successfully unmatched with user: ${chatId}`, null, statusCode);

        res.status(statusCode).json(response);
    }).catch((err) => {
        const response = Api.getError("Failed to unmatch with user", err);
        res.status(500).json(response);
    })
};


module.exports = {
    createChat,
    sendMessage,
    unmatch
}