const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const validateLogin = require("../middlewares/authenticate");
const validateUser = require("../middlewares/active");
const validateType = require("../middlewares/type");

router.post("/account", [validateLogin, validateUser], userController.view);
// router.post("/edit", [validateLogin, validateUser], userController.edit);
router.patch("/accept/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.accept);
router.patch("/delete/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.delete);

module.exports = router;