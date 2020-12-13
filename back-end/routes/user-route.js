const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const validateLogin = require("../middlewares/authenticate");

// editar utilizador
// bloquear conta
// terminar sessão
router.delete("/delete/:id", validateLogin, userController.delete);

module.exports = router;