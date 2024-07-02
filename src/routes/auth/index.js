const express = require("express");
const router = express.Router();

const {
    AuthMiddleware
} = require("../../middleware");

// Get a user
router.post('/', AuthMiddleware.authUser);

module.exports = router;