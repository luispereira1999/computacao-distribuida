const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const validateLogin = require("../middlewares/authenticate");

router.get("/view/:id", validateLogin, userController.view);
// router.patch("/edit/:id", validateLogin, userController.edit);
// router.patch("/block/:id", validateLogin, userController.block);
router.patch("/active/:id", validateLogin, userController.active);
// router.post("/logout/:id", validateLogin, userController.logout);
router.delete("/delete/:id", validateLogin, userController.delete);

module.exports = router;