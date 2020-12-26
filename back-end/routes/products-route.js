const express = require("express");
const router = express.Router();
const productController = require("../controllers/products-controller");
const validateLogin = require("../middlewares/authenticate");
const validateUser = require("../middlewares/active");
const validateType = require("../middlewares/type");

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.get("/:filter/:name", productController.getByName);
router.post("/create", [validateLogin, validateUser, validateType.checkMerchant], productController.create);
router.patch("/edit/:id", [validateLogin, validateUser, validateType.checkMerchant], productController.edit);
router.patch("/delete/:id", [validateLogin, validateUser, validateType.checkMerchant], productController.delete);

module.exports = router;