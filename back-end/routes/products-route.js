const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const validateLogin = require("../middlewares/authenticate");

// router.get("/", signupController.signupClient);
// router.get("/:id", signupController.signupClient);
router.post("/new", validateLogin, productController.new);
// router.post("/edit", signupController.signupDriver);
// router.post("/delete", signupController.signupAdmin);

module.exports = router;