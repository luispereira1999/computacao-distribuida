const database = require("../utils/database");
const jwt = require("jsonwebtoken");
var User = require("../models/user");


module.exports = {
   view: async (req, res, next) => {
      const db = database.connect();

      // obter dados da request
      const decodedSession = jwt.verify(req.body.session, "hard-secret");
      var user = new User(decodedSession);

      if (checkValidID(req.params.id, decodedSession.id))
         return res.status(400).json({ "error": "Ups! ID do utilizador não corresponde ao da sessão atual." });

      // selecionar utilizador na base de dados
      var sql = "SELECT * FROM Users WHERE id = ?";
      var params = user.id;
      db.get(sql, params, function (err, row) {
         if (err)
            return res.status(400).json({ "error": res.message });

         return res.json({ "data": row });
      });

      db.close();
   },


   // editar utilizador
   edit: async (req, res, next) => {
      const db = database.connect();

      // obter dados da request
      const decodedSession = jwt.verify(req.body.session, "hard-secret");
      var user = new User(decodedSession);

      if (checkValidID(req.params.id, decodedSession.id))
         return res.status(400).json({ "error": "Ups! ID do utilizador não corresponde ao da sessão atual." });

      // editar na tabela utilizadores
      var sql = "UPDATE Users SET username = ?, password = ?, name = ?, email = ?, birth_date = ?, gender = ?, phone_number = ?, city = ?, address = ?, zip_code = ?, nif = ? WHERE id = ?";
      var params = [user.username, hash, user.name, user.email, user.birth_date, user.gender, user.phone_number, user.city, user.address, user.zip_code, user.nif];
      db.run(sql, params, function (err) {
         if (err)
            return res.status(400).json({ "error": res.message });

         return res.json({ "message": "Utilizador editado com sucesso!" });
      });

      db.close();
   },


   // ativar utilizador
   active: async (req, res, next) => {
      const db = database.connect();

      // obter dados da request
      const decodedSession = jwt.verify(req.body.session, "hard-secret");
      var user = new User(decodedSession);

      if (checkValidID(req.params.id, decodedSession.id))
         return res.status(400).json({ "error": "Ups! ID do utilizador não corresponde ao da sessão atual." });

      // ativar utilizador na base de dados
      var sql = "UPDATE Users SET active = 1 WHERE id = ?";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(400).json({ "error": res.message });

         return res.json({ "message": "Utilizador ativado com sucesso!" });
      });

      db.close();
   },


   // excluir utilizador
   delete: async (req, res, next) => {
      const db = database.connect();

      // obter dados da request
      const decodedSession = jwt.verify(req.body.session, "hard-secret");
      var user = new User(decodedSession);

      if (checkValidID(req.params.id, decodedSession.id))
         return res.status(400).json({ "error": "Ups! ID do utilizador não corresponde ao da sessão atual." });

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