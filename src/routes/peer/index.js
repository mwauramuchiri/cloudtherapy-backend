const express = require("express");
const router = express.Router();

const {
    PeerMiddleware
} = require("../../middleware");

// Match
router.post('/match/:uid', PeerMiddleware.matchPeers);

module.exports = router;