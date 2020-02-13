const express = require("express");
const router = express.Router();

// Routes
const ChatRoutes = require("./routes/chat");

//* Official route setup
router.use("/chat", ChatRoutes);

module.exports = router;