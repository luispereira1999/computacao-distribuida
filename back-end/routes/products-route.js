const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const validateLogin = require("../middlewares/authenticate");
const validateUser = require("../middlewares/active");

router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.post("/create", [validateLogin, validateUser], productController.create);

module.exports = router;