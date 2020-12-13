const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   try {
      const decode = jwt.verify(req.body.session, "hard-secret");
      req.user = decode;
      next();
   }
   catch (error) {
      return res.status(401).send({ mensagem: "Ups! Erro ao autenticar." });
   }
};