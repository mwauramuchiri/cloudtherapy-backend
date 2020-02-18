const express = require("express");
const router = express.Router();

// Routes
const AuthRoutes = require("./routes/auth");
const ChatRoutes = require("./routes/chat");
const PeerRoutes = require("./routes/peer");
const UserRoutes = require("./routes/user");

//* Official route setup
router.use("/auth", AuthRoutes);
router.use("/chat", ChatRoutes);
router.use("/peer", PeerRoutes);
router.use("/user", UserRoutes);

module.exports = router;