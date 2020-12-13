const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signup-controller");

router.post("/client", signupController.signupClient);
router.post("/merchant", signupController.signupMerchant);
router.post("/driver", signupController.signupDriver);
router.post("/admin", signupController.signupAdmin);

module.exports = router;