const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register-controller");

router.post("/client", registerController.registerClient);
router.post("/merchant", registerController.registerMerchant);
router.post("/driver", registerController.registerDriver);
router.post("/admin", registerController.registerAdmin);

module.exports = router;