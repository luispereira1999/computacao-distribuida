var User = require("../models/user");


module.exports = {
   checkMerchant: async (req, res, next) => {
      var user = new User(req.user);
      if (user.type != 2)
         return res.status(201).json({ "message": "O utilizador não tem permissão para executar esta operação!" });
      next();
   },


   checkDriver: async (req, res, next) => {
      var user = new User(req.user);
      if (user.type != 3)
         return res.status(201).json({ "message": "O utilizador não tem permissão para executar esta operação!" });
      next();
   },


   checkAdmin: async (req, res, next) => {
      var user = new User(req.user);
      if (user.type != 4)
         return res.status(201).json({ "message": "O utilizador não tem permissão para executar esta operação!" });
      next();
   },
};