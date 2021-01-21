const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/default-controller");

router.get("/", defaultController.default);

module.exports = router;