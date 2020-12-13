const database = require("../utils/database");
const jwt = require("jsonwebtoken");
var User = require("../models/user");


module.exports = {
   // excluir utilizador
   delete: async (req, res, next) => {
      const db = database.connect();

      // obter dados da resposta
      const decodedSession = jwt.verify(req.body.session, "hard-secret");
      var user = new User(decodedSession);

      if (checkValidID(req.params.id, decodedSession.id))
         return res.status(400).json({ "error": "Ups! ID do utilizador a ser excluído não corresponde ao da sessão atual." });

      // apagar na tabela utilizadores
      var sql = "DELETE FROM Users WHERE id = ?";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(400).json({ "error": res.message });

         // apagar na tabela do tipo de utilizador
         var sql = checkUserType(decodedSession.type);
         db.run(sql, params, function (err) {
            if (err)
               return res.status(400).json({ "error": res.message });

            return res.json({ "message": "Utilizador excluído com sucesso!", });
         });
      });

      db.close();
   }
}


function checkValidID(currentID, sessionID) {
   return currentID != sessionID;
}