const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products-controller");
const validateLogin = require("../middlewares/authenticate");
const validateUser = require("../middlewares/active");
const validateType = require("../middlewares/type");

router.get("/", productsController.getAll);
router.get("/:id", productsController.getById);
router.get("/:filter/:name", productsController.getByName);
router.post("/create", [validateLogin, validateUser, validateType.checkMerchant], productsController.create);
router.patch("/edit/:id", [validateLogin, validateUser, validateType.checkMerchant], productsController.edit);
router.patch("/delete/:id", [validateLogin, validateUser, validateType.checkMerchant], productsController.delete);

module.exports = router;