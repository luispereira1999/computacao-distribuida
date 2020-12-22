const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const validateLogin = require("../middlewares/authenticate");

router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.post("/create", validateLogin, productController.create);
//router.patch("/edit", productController.edit);
router.patch("/delete/:id", validateLogin, productController.delete);

module.exports = router;