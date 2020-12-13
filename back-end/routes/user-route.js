const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const validateLogin = require("../middlewares/authenticate");

router.get("/view/:id", validateLogin, userController.viewInfo);
// router.patch("/edit/:id", validateLogin, userController.edit);
// router.patch("/edit/:id", validateLogin, userController.block);
// router.post("/edit/:id", validateLogin, userController.logout);
router.delete("/delete/:id", validateLogin, userController.delete);

module.exports = router;