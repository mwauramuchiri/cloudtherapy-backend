const express = require("express");
const router = express.Router();

const {
    UserMiddleware
} = require("../../middleware");

// Get a user
router.get('/:uid', UserMiddleware.getUser);


module.exports = router;