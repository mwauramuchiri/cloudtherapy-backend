const Chat = require('../../lib/chat');
const Api = require('../../utils/api');

// Create chat
const createChat = (req, res, next) => {
    const participantIds = req.body.data.participantIds;
    Api.attachErrorHandler(res,
        Chat.createChat(participantIds).then(() => {
            const statusCode = 201;
            const response = Api.getResponse(true, "Successfully created chat", null, statusCode);

            res.status(statusCode).json(response);
            next()
        })
    );
};

// Send message
const sendMessage = (req, res, next) => {
    const chatId = req.body.data.chatId;
    const messageData = req.body.data.message;

    Api.attachErrorHandler(res,
        Chat.sendMessage(chatId, messageData).then(() => {
            const statusCode = 201;
            const response = Api.getResponse(true, "Successfully sent message", null, statusCode);

            res.status(statusCode).json(response);
            next
        })
    );
};

//TODO? Maybe refactor this into `Peer` ~
// Unmatch with a user
const unmatch = (req, res, next) => {
    const chatId = req.body.data.chatId;

    Api.attachErrorHandler(res,
        Chat.unmatch(chatId).then(() => {
            const response = Api.getResponse(true, `Successfully unmatched with user: ${chatId}`, null);

            res.status(response.statusCode).json(response);
            next();
        })
    );
};


module.exports = {
    createChat,
    sendMessage,
    unmatch
}