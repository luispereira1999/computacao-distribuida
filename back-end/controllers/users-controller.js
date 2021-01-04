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
            return res.status(500).json({ "message": "Oh! " + err.message });

         res.status(200).json({ "message": "Dados do utilizador obtidos com sucesso!", "data": row });
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
   //          return res.status(500).json({ "message": "Oh! " + err.message });

   //       res.status(200).json({ "message": "Utilizador editado com sucesso!" });
   //    });

   //    db.close();
   // },


   editPhoto: async (req, res, next) => {
      const db = database.connect();

      var errors = await checkInvalidFields(req, "edit-photo");
      if (errors.exist)
         return res.status(400).json({ "message": errors.message.join(" | ") });

      var user = new User({ "id": req.user.id, "url_photo": req.file.filename });

      // atualizar utilizador na base de dados
      var sql = "UPDATE Users SET url_photo = ? WHERE id = ?";
      var params = [user.url_photo, user.id];
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         res.status(200).json({ "message": "Foto do utilizador editada com sucesso!" });
      });

      db.close();
   },


   getByNotAccepted: async (req, res, next) => {
      const db = database.connect();

      // selecionar utilizador na base de dados
      var sql = "SELECT username, name, email, type FROM Users WHERE accepted = 0";
      var params = [];
      db.all(sql, params, function (err, rows) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (rows.length == 0)
            res.status(400).json({ "message": "Ups! Não existem utilizadores por aceitar." });
         else
            res.status(200).json({ "message": "Utilizadores obtidos com sucesso!", "data": rows });
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
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Ups! O utilizador não existe." });

         res.status(200).json({ "message": "Utilizador aceitado com sucesso!" });
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
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Ups! O utilizador não existe." });

         res.status(200).json({ "message": "Utilizador definido como administrador com sucesso!" });
      });

      db.close();
   },


   removeAdmin: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.params);
      var userLogged = new User(req.user);

      if (userLogged.id == user.id)
         return res.status(201).json({ "message": "Oh! Não pode remover de administrador o utilizador atual." });

      // selecionar utilizador que foi removido de utilizador na base de dados
      var sql = "SELECT old_type FROM Users WHERE id = ?";
      var params = user.id;
      db.get(sql, params, function (err, row) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         user.old_type = row.old_type;

         // atualizar utilizador na base de dados
         var sql = "UPDATE Users SET type = ? WHERE id = ?";
         var params = [user.old_type, user.id];
         db.run(sql, params, function (err) {
            if (err)
               return res.status(500).json({ "message": "Oh! " + err.message });

            if (this.changes == 0)
               return res.status(400).json({ "message": "Ups! O utilizador não existe." });

            res.status(200).json({ "message": "Utilizador removido de administrador com sucesso! Voltou ao seu tipo antigo." });
         });
      });

      db.close();
   },


   delete: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.params);
      var userLogged = new User(req.user);

      if (userLogged.id == user.id)
         return res.status(201).json({ "message": "Ups! Não pode excluir o utilizador atual." });

      // atualizar utilizador na base de dados
      var sql = "UPDATE Users SET deleted = 1 WHERE id = ?";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Ups! O utilizador não existe." });

         res.status(200).json({ "message": "Utilizador excluído com sucesso!" });
      });

      db.close();
   }
}


function checkInvalidFields(req, operation) {
   var errors = [];

   switch (operation) {
      case "edit-data":
         if (!req.body.name)
            errors.push("Ups! O nome do produto não foi preenchido.");
         if (!req.body.stock)
            errors.push("O stock não foi preenchida.");
         if (!req.body.price)
            errors.push("O preço não foi preenchido.");
         if (!req.body.description)
            errors.push("A descrição não foi preenchida.");
         if (!req.file)
            errors.push("A foto do produto não foi preenchida.");
         else {
            if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg") {
               removeFile(req.file.path);
               errors.push("O foto do produto foi inserida incorretamente.");
            }
         }

         if (errors.length)
            return { "exist": true, "message": errors };
         else
            return { "exist": false };
      case "edit-photo":
         if (!req.file)
            errors.push("A foto do utilizador não foi preenchida.");
         else {
            if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg") {
               removeFile(req.file.path);
               errors.push("O foto do utilizador foi inserida incorretamente.");
            }
         }

         if (errors.length)
            return { "exist": true, "message": errors };
         else
            return { "exist": false };
      case "edit-driving-license":
         if (!req.file)
            errors.push("A foto do produto não foi preenchida.");
         else {
            if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg") {
               removeFile(req.file.path);
               errors.push("O foto do produto foi inserida incorretamente.");
            }
         }

         if (errors.length)
            return { "exist": true, "message": errors };
         else
            return { "exist": false };
      default:
         return { "exist": false };
   }
}