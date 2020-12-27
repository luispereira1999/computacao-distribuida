const database = require("../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var User = require("../models/user");
var TypeUser = require("../models/type-user");


module.exports = {
   registerClient: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req, 1);
      if (errors.exist) {
         return res.status(400).json({ "error": errors.message.join(" | ") });
      }

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req, res);
      if (userExist.exist) {
         return res.status(400).json({ "error": userExist.message });
      }

      var user = new User(req.body);
      var typeUser = new TypeUser({ "id": 1 })

      // inserir na tabela utilizadores
      var sql = "INSERT INTO Users (username, password, name, surname, email, phone_number, address, zip_code, receive_advertising, accepted, locked, deleted, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0, 0, ?)";
      const hash = await bcrypt.hashSync(user.password, 10);
      var params = [user.username, hash, user.name, user.surname, user.email, user.phone_number, user.address, user.zip_code, user.receive_advertising, typeUser.id];

      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": err.message });

         // dados ao criar sessão
         const token = jwt.sign({
            id: this.lastID,
            username: this.username,
            name: user.name,
            email: user.email,
            type: 1
         }, "hard-secret", { expiresIn: "24h" });

         res.status(201).json({
            "message": "Cliente registado com sucesso!",
            "message2": "O utilizador '" + user.username + "' efetuou login com sucesso!",
            "session": token
         });
      });

      db.close();
   },


   registerMerchant: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req, 2);
      if (errors.exist) {
         return res.status(400).json({ "error": errors.message.join(" | ") });
      }

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req, res);
      if (userExist.exist) {
         return res.status(400).json({ "error": userExist.message });
      }

      var user = new User(req.body);
      var typeUser = new TypeUser({ "id": 2 })

      // inserir na tabela utilizadores
      var sql = "INSERT INTO Users (username, password, name, email, phone_number, address, zip_code, nif, description, receive_advertising, accepted, locked, deleted, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?)";
      const hash = await bcrypt.hashSync(user.password, 10);
      var params = [user.username, hash, user.name, user.email, user.phone_number, user.address, user.zip_code, user.nif, user.description, user.receive_advertising, typeUser.id];

      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": err.message });

         res.status(201).json({ "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta." });
      });

      db.close();
   },


   registerDriver: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req, 3);
      if (errors.exist) {
         return res.status(400).json({ "error": errors.message.join(" | ") });
      }

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req, res);
      if (userExist.exist) {
         return res.status(400).json({ "error": userExist.message });
      }

      var user = new User(req.body);
      var typeUser = new TypeUser({ "id": 3 })

      // inserir na tabela utilizadores
      var sql = "INSERT INTO Users (username, password, name, surname, email, phone_number, address, zip_code, driving_license, receive_advertising, accepted, locked, deleted, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?)";
      const hash = await bcrypt.hashSync(user.password, 10);
      var params = [user.username, hash, user.name, user.surname, user.email, user.phone_number, user.address, user.zip_code, user.driving_license, user.receive_advertising, typeUser.id];

      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": err.message });

         res.status(201).json({ "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta." });
      });

      db.close();
   },


   registerAdmin: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req, 4);
      if (errors.exist) {
         return res.status(400).json({ "error": errors.message.join(" | ") });
      }

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req, res);
      if (userExist.exist) {
         return res.status(400).json({ "error": userExist.message });
      }

      var user = new User(req.body);
      var typeUser = new TypeUser({ "id": 4 })

      // inserir na tabela utilizadores
      var sql = "INSERT INTO Users (username, password, name, surname, email, phone_number, address, zip_code, description, receive_advertising, accepted, locked, deleted, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?)";
      const hash = await bcrypt.hashSync(user.password, 10);
      var params = [user.username, hash, user.name, user.surname, user.email, user.phone_number, user.address, user.zip_code, user.description, user.receive_advertising, typeUser.id];

      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": err.message });

         res.status(201).json({ "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta." });
      });

      db.close();
   }
};


function checkFields(req, typeUser) {
   var errors = [];

   switch (typeUser) {
      case 1:
         if (!req.body.username) {
            errors.push("O nome de utilizador não foi preenchido.");
         }
         if (!req.body.password) {
            errors.push("A senha não foi preenchida.");
         }
         if (!req.body.name) {
            errors.push("O nome não foi preenchido.");
         }
         if (!req.body.surname) {
            errors.push("O apelido não foi preenchido.");
         }
         if (!req.body.email) {
            errors.push("O email não foi preenchido.");
         }
         if (!req.body.phone_number) {
            errors.push("O número de telemóvel não foi preenchido.");
         }
         if (!req.body.address) {
            errors.push("A morada não foi preenchida.");
         }
         if (!req.body.zip_code) {
            errors.push("O código postal não foi preenchido.");
         }
         if (errors.length) {
            return ({
               "exist": true,
               "message": errors
            });
         }
         return ({ "exist": false });
      case 2:
         if (!req.body.username) {
            errors.push("O nome de utilizador não foi preenchido.");
         }
         if (!req.body.password) {
            errors.push("A senha não foi preenchida.");
         }
         if (!req.body.name) {
            errors.push("O nome não foi preenchido.");
         }
         if (!req.body.email) {
            errors.push("O email não foi preenchido.");
         }
         if (!req.body.phone_number) {
            errors.push("O número de telemóvel não foi preenchido.");
         }
         if (!req.body.address) {
            errors.push("A morada não foi preenchida.");
         }
         if (!req.body.zip_code) {
            errors.push("O código postal não foi preenchido.");
         }
         if (!req.body.nif) {
            errors.push("O NIF não foi preenchido.");
         }
         if (req.body.nif.toString().length != 9) {
            errors.push("O NIF tem de ter 9 dígitos.");
         }
         if (!req.body.description) {
            errors.push("A descrição não foi preenchida.");
         }
         if (errors.length) {
            return ({
               "exist": true,
               "message": errors
            });
         }
         return ({ "exist": false });
      case 3:
         if (!req.body.username) {
            errors.push("O nome de utilizador não foi preenchido.");
         }
         if (!req.body.password) {
            errors.push("A senha não foi preenchida.");
         }
         if (!req.body.name) {
            errors.push("O nome não foi preenchido.");
         }
         if (!req.body.email) {
            errors.push("O email não foi preenchido.");
         }
         if (!req.body.phone_number) {
            errors.push("O número de telemóvel não foi preenchido.");
         }
         if (!req.body.address) {
            errors.push("A morada não foi preenchida.");
         }
         if (!req.body.zip_code) {
            errors.push("O código postal não foi preenchido.");
         }
         if (!req.body.driving_license) {
            errors.push("O carta de condução não foi preenchida.");
         }
         if (errors.length) {
            return ({
               "exist": true,
               "message": errors
            });
         }
         return ({ "exist": false });
      case 4:
         if (!req.body.username) {
            errors.push("O nome de utilizador não foi preenchido.");
         }
         if (!req.body.password) {
            errors.push("A senha não foi preenchida.");
         }
         if (!req.body.name) {
            errors.push("O nome não foi preenchido.");
         }
         if (!req.body.surname) {
            errors.push("O apelido não foi preenchido.");
         }
         if (!req.body.email) {
            errors.push("O email não foi preenchido.");
         }
         if (!req.body.phone_number) {
            errors.push("O número de telemóvel não foi preenchido.");
         }
         if (!req.body.address) {
            errors.push("A morada não foi preenchida.");
         }
         if (!req.body.zip_code) {
            errors.push("O código postal não foi preenchido.");
         }
         if (!req.body.description) {
            errors.push("A descrição não foi preenchida.");
         }
         if (errors.length) {
            return ({
               "exist": true,
               "message": errors
            });
         }
         return ({ "exist": false });
      default:
         return ({ "exist": false });
   }
}


function checkUsernameOrEmailAlreadyExist(db, req, res) {
   return new Promise((resolve) => {
      var user = new User(req.body);
      var sql = "SELECT id FROM Users WHERE (username = ? OR email = ?) AND deleted = 0 LIMIT 1";
      var params = [user.username, user.email];
      var userExist = { "exist": false };

      db.each(sql, params, (err, row) => {
         if (err)
            return userExist = {
               "exist": false,
               "message": err.message
            };

         if (row)
            return userExist = {
               "exist": true,
               "message": "Nome de utilizador ou email já existem. Coloque outro por favor."
            };
         else
            return userExist = { "exist": false };
      }, () => {
         resolve(userExist);
      });
   });
}