const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders-controller");
const validateLogin = require("../middlewares/authenticate");
const validateUser = require("../middlewares/active");

router.post("/create", [validateLogin, validateUser], ordersController.create);
router.patch("/cancel", [validateLogin, validateUser], ordersController.cancel);

module.exports = router;