const express = require("express");
const router = express.Router();
const deliveriesController = require("../controllers/deliveries-controller");
const validateLogin = require("../middlewares/authenticate");
const validateUser = require("../middlewares/active");
const validateType = require("../middlewares/type");

router.post("/accept", [validateLogin, validateUser, validateType.checkDriver], deliveriesController.accept);
router.patch("/complete", [validateLogin, validateUser, validateType.checkDriver], deliveriesController.complete);

module.exports = router;