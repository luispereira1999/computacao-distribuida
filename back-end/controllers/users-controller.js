const database = require("../utils/database");
var User = require("../models/user");


module.exports = {
   view: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.user);

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


   // editData: async (req, res, next) => {
   //    const db = database.connect();

   //    var user = new User(req.body);
   //    var userLogged = new User(req.user);

   // atualizar utilizador na base de dados
   //    var sql = "UPDATE Users SET name = ?, email = ?, phone_number = ?, address = ?, zip_code = ?, nif = ? WHERE id = ?";
   //    var params = [user.name, user.email, user.phone_number, user.address, user.zip_code, user.nif, userLogged.id];
   //    db.run(sql, params, function (err) {
   //       if (err)
   //          return res.status(500).json({ "error": res.message });

   //       res.status(200).json({ "message": "Utilizador editado com sucesso!" });
   //    });

   //    db.close();
   // },


   getByNotAccepted: async (req, res, next) => {
      const db = database.connect();

      // selecionar utilizador na base de dados
      var sql = "SELECT username, name, email, type FROM Users WHERE accepted = 0";
      var params = [];
      db.all(sql, params, function (err, rows) {
         if (err)
            return res.status(500).json({ "error": res.message });

         if (rows.length == 0)
            res.status(400).json({ "message": "Oh! Não existem utilizadores por aceitar." });
         else
            res.status(200).json({
               "message": "Utilizadores obtidos com sucesso!",
               "data": rows
            });
      });

      db.close();
   },


   setAdmin: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.params);

      // atualizar utilizador na base de dados
      var sql = "UPDATE Users SET type = 4 WHERE id = ?";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": res.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Oh! O utilizador não existe." });

         res.status(200).json({ "message": "Utilizador definido como administrador com sucesso!" });
      });

      db.close();
   },


   removeAdmin: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.params);

      // atualizar utilizador na base de dados
      var sql = "UPDATE Users SET type = 1 WHERE id = ?";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": res.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Oh! O utilizador não existe." });

         res.status(200).json({ "message": "Utilizador removido de administrador com sucesso!" });
      });

      db.close();
   },


   accept: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.params);

      // atualizar utilizador na base de dados
      var sql = "UPDATE Users SET accepted = 1 WHERE id = ?";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": res.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Oh! O utilizador não existe." });

         res.status(200).json({ "message": "Utilizador aceitado com sucesso!" });
      });

      db.close();
   },


   delete: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.params);
      var userLogged = new User(req.user);

      if (userLogged.id == user.id)
         return res.status(201).json({ "message": "Oh! Não pode excluir o utilizador atual." });

      // atualizar utilizador na base de dados
      var sql = "UPDATE Users SET deleted = 1 WHERE id = ?";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": res.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Oh! O utilizador não existe." });

         res.status(200).json({ "message": "Utilizador excluído com sucesso!" });
      });

      db.close();
   }
}