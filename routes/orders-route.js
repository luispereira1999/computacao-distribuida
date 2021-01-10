const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders-controller");
const validateLogin = require("../middlewares/authenticate");
const validateUser = require("../middlewares/active");

router.get("/", [validateLogin, validateUser], ordersController.getFromUser);
router.post("/create", [validateLogin, validateUser], ordersController.create);
router.delete("/cancel", [validateLogin, validateUser], ordersController.cancel);

module.exports = router;