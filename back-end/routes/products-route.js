const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const validateLogin = require("../middlewares/authenticate");
const validateUser = require("../middlewares/active");
const validateType = require("../middlewares/type");

router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.post("/create", [validateLogin, validateUser, validateType.checkMerchant], productController.create);
router.patch("/delete/:id", [validateLogin, validateUser, validateType.checkMerchant], productController.delete);

module.exports = router;