const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const validateLogin = require("../middlewares/authenticate");

router.post("/account", validateLogin, userController.view);
router.patch("/accept/:id", validateLogin, userController.accept);
router.patch("/delete/:id", validateLogin, userController.delete);

module.exports = router;