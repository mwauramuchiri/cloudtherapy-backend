const express = require("express");
const router = express.Router();

const ChatMiddleware = require("../../middleware/chat");

// Create chat
router.post('/', ChatMiddleware.createChat);

// Send message
router.post('/message', ChatMiddleware.sendMessage);

// Unmatch
router.post('/unmatch', ChatMiddleware.unmatch);


module.exports = router;