const database = require("../utils/database");
var User = require("../models/user");


module.exports = {
   view: async (req, res, next) => {
      const db = database.connect();

      // obter dados da request
      var user = new User(req.user);

      if (checkValidID(req.params.id, req.user.id))
         return res.status(400).json({ "error": "Ups! ID do utilizador não corresponde ao da sessão atual." });

      // selecionar utilizador na base de dados
      var sql = "SELECT * FROM Users WHERE id = ?";
      var params = user.id;
      db.get(sql, params, function (err, row) {
         if (err)
            return res.status(500).json({ "error": res.message });

         res.status(200).json({ "data": row });
      });

      db.close();
   },


   edit: async (req, res, next) => {
      const db = database.connect();

      // obter dados da request
      var user = new User(req.user);

      if (checkValidID(req.params.id, req.user.id))
         return res.status(400).json({ "error": "Ups! ID do utilizador não corresponde ao da sessão atual." });

      // editar na tabela utilizadores
      var sql = "UPDATE Users SET username = ?, password = ?, name = ?, email = ?, birth_date = ?, gender = ?, phone_number = ?, city = ?, address = ?, zip_code = ?, nif = ? WHERE id = ?";
      var params = [user.username, hash, user.name, user.email, user.birth_date, user.gender, user.phone_number, user.city, user.address, user.zip_code, user.nif];
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": res.message });

         res.status(200).json({ "message": "Utilizador editado com sucesso!" });
      });

      db.close();
   },


   accept: async (req, res, next) => { 
      const db = database.connect();

      // obter dados da request
      var user = new User(req.user);

      if (checkValidID(req.params.id, req.user.id))
         return res.status(400).json({ "error": "Ups! ID do utilizador não corresponde ao da sessão atual." });

      // aceitar utilizador na base de dados
      var sql = "UPDATE Users SET accepted = 1 WHERE id = ?";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": res.message });

         res.status(200).json({ "message": "Utilizador aceitado com sucesso!" });
      });

      db.close();
   },


   delete: async (req, res, next) => {
      const db = database.connect();

      // obter dados da request
      var user = new User(req.user);

      if (checkValidID(req.params.id, req.user.id))
         return res.status(400).json({ "error": "Ups! ID do utilizador não corresponde ao da sessão atual." });

      // excluir utilizador na base de dados
      var sql = "UPDATE Users SET deleted = 1 WHERE id = ?";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": res.message });

         res.status(200).json({ "message": "Utilizador excluído com sucesso!", });
      });

      db.close();
   }
}


function checkValidID(currentID, sessionID) {
   return currentID != sessionID;
}