const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   try {
      var token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, "hard-secret");
      req.user = decode;
      next();
   }
   catch (error) {
      return res.status(401).json({ "message": "Ups! Erro ao autenticar." });
   }
};